import {Router } from 'express';
import UserManager from '../../dao/db/UserManagerDB.js';

const router = Router();
const US = new UserManager();

router.post("/register", async (req, res) => {
    try {
        await US.createUser(req.body);
        req.session.registerSuccess = true;
        res.redirect("/login");
    } catch (error) {
        req.session.registerFailed = true;
        res.redirect("/register");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;
        const { first_name, last_name, age } = await US.login(email, password);

        req.session.user = {first_name, last_name, email, age};
        req.session.loginFailed = false;
        res.redirect("/");
    } catch (error) {
        req.session.loginFailed = true;
        res.redirect("/login");
    }
});

export default router;