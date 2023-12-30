import { Router } from 'express';
import { sendRecoveryPasswordEmail } from '../../functions/sendEmail.js';
import UserController from '../../controllers/UserController.js';

const router = Router();
const userController = new UserController();

router.post('/recovery', async (req, res) => {
    try{
        const {email}= req.body;
        const userResult = await userController.getUserByEmail(email);

        if (!userResult) throw new Error('User not found');

        const user = {
            id: userResult[0]._id,
            email: userResult[0].email,
        }

        const token = Math.random().toString(36).substring(7);
        req.session.resetToken = { user, token, timestamp: Date.now() };

        sendRecoveryPasswordEmail(token, email)
        
        res.redirect('/login')
    }catch(error){
        console.log(error.message);
        res.send(error.message);
    }
})

export default router;