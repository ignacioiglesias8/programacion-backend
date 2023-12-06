import { Router } from 'express';
import nodemailer from 'nodemailer';
import UserController from '../../controllers/UserController.js';

const router = Router();
const userController = new UserController();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

router.post('/send', async (req, res) => {
    try{
        const {email, message}= req.body;

        if (!emailRegex.test(email)) throw new Error ('Invalid email');

        const result = await transport.sendMail({
            from: 'Ecommerce <ignacioiglesias8@gmail.com>',
            to: email,
            subject: 'Correo de prueba',
            html:   `<div>
                        <h1>Correo de prueba</h1>
                        <p>${message}</p>
                    </div>`,
        })
        
        res.send({status: 'success', result})
    }catch(error){
        console.log(error.message);
        res.status(500).send({status: 'error', message: 'error to send email'});
    }
})

router.post('/recovery', async (req, res) => {
    try{
        const {email}= req.body;

        if (!emailRegex.test(email)) throw new Error ('Invalid email');

        const userResult = await userController.getUserByEmail(email);

        if (!userResult) throw new Error('User not found');

        const user = {
            id: userResult[0]._id,
            email: userResult[0].email,
        }

        const token = Math.random().toString(36).substring(7);
        req.session.resetToken = { user, token, timestamp: Date.now() };

        const link = `http://localhost:8080/recovery/${token}`

        await transport.sendMail({
            from: 'Ecommerce <ignacioiglesias8@gmail.com>',
            to: email,
            subject: 'Recuperación de contraseña',
            html:   `<div>
                        <h1>Recuperación de contraseña</h1>
                        <p>Para recuperar la contraseña, por favor ingresar a este 
                        <a href="${link}">link</a></p>
                    </div>`,
        })
        
        res.redirect('/login')
    }catch(error){
        console.log(error.message);
        res.send(error.message);
    }
})

export default router;