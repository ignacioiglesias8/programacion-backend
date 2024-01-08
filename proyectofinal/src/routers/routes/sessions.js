import {Router } from 'express';
import passport from 'passport';
import UserController from '../../controllers/UserController.js';

const router = Router();
const userController = new UserController();

router.post(
    "/register",
    passport.authenticate('register',{failureRedirect: '/api/sessions/failRegister'}),
    (req, res) => {
        res.redirect("/login")
    }
);

router.get("/failRegister", (req, res) => {
    req.logger.error('Failded Strategy: Missing or duplicate param');
    res.redirect("/register")
});

router.post(
    "/login",
    passport.authenticate('login',{failureRedirect: '/api/sessions/failLogin'}),
    async (req, res) => {
        if (!req.user) {
            return res.status(400).send({status: "error", error: "Invalid credentials"});
        }

        const currentDate = new Date();
        currentDate.setTime(currentDate.getTime());
        req.user.last_connection = currentDate;
        await req.user.save();

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            documents: req.user.documents,
            id: req.user._id
        }

        res.redirect("/products");
    }
);

router.get("/failLogin", (req, res) => {
    req.logger.error('Failded Strategy: Failed to login');
    res.send({
        status: 'error',
        message: 'Failed Login'
    });
});

router.get("/logout", async (req, res) => {
    const userLogged = req.session.user;
    const user = await userController.getUserByEmail(userLogged.email);

    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    user[0].last_connection = currentDate;
    await user[0].save();

    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar la sesión: " + err.message);
        }
        res.redirect("/login");
    });
});

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), 
async (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/login'}), 
async (req, res) => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    req.user.last_connection = currentDate;

    await req.user.save();
    
    req.session.user = req.user;
    res.redirect('/products');
});

router.get('/current', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'No autenticado !!' });
    }

    const currentUser = await userController.getUserByEmail(req.session.user.email);
    const userRaw = await userController.showUsers(currentUser)
    const user = userRaw.users

    res.send({ user });
});

export default router;