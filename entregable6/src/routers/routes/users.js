import {Router } from 'express';
import passport from 'passport';

const router = Router();

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

export default router;