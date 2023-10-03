import {Router } from 'express';
import passport from 'passport';
import UserManager from '../../dao/db/UserManagerDB.js';

const router = Router();
const userManager = new UserManager();

router.post(
    "/register",
    passport.authenticate('register',{failureRedirect: '/api/sessions/failRegister'}),
    (req, res) => {
        res.redirect("/login")
    }
);

router.get("/failRegister", (req, res) => {
    console.log('Failded Stratergy');
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
    console.log('Failded Stratergy');
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

    const user = req.session.user;

    res.send({ user });
});

export default router;