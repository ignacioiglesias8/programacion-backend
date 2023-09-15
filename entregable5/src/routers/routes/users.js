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
        const adminCredentials = {
            email: 'adminCoder@coder.com',
            password: 'adminCod3r123',
        };

        if (email === adminCredentials.email && password === adminCredentials.password) {
            req.session.user = {
                first_name: 'Admin', 
                last_name: 'Coder',
                email: adminCredentials.email,
                age: 0,             
                role: 'admin',      
            };
            req.session.loginFailed = false;
            res.redirect("/products");  
        }else{
            const { first_name, last_name, age, role } = await US.login(email, password);

            req.session.user = { first_name, last_name, email, age, role };
            req.session.loginFailed = false;
            res.redirect("/products");
        }
    } catch (error) {
        req.session.loginFailed = true;
        req.session.registerSuccess = false;
        res.redirect("/login");
    }
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