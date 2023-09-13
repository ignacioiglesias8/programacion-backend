import {Router } from 'express';
import UserManager from '../dao/db/UserManagerDB.js';

const router = Router();

const US = new UserManager();

router.post("/register", async (req,res) =>{
    try{
        const response = await US.createUser(req.body);
        res.send(response); 
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});

router.post("/login", async (req,res) =>{
    try{
        const {email, password} = req.body;
        const response = await US.login(email, password);
        res.send(response); 
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});

export default router;