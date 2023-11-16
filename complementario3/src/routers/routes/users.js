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

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
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

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar la sesión: " + err.message);
        }
        res.redirect("/login");
    });
});

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

router.get('/current', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'No autenticado !!' });
    }

    const currentUser = await userController.getUserByEmail(req.session.user.email);
    const user = await userController.showCurrentUser(currentUser[0])

    res.send({ user });
});

router.get('/:email', async (req, res) => {
    const user = await userController.getUserByEmail(req.params.email);

    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    res.send({user});
})

router.get('/recovery:token', async (req, res) => {
    res.send(req.params.token);
})

export default router;