import { Router } from 'express';
import UserManager from '../../dao/db/UserManagerDB.js';

const router = Router();
const userManager = new UserManager();

router.get('/:uid', async (req, res) => {
    const user = await userManager.getUserById(req.params.uid);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.send({user});
});

export default router;