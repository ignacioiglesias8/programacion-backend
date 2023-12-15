import {Router } from 'express';
import { authorization } from '../../functions/auth.js';
import { uploader } from '../../middlewares/multerConfig.js';
import { uploadFile } from '../../functions/uploadFile.js';
import UserController from '../../controllers/UserController.js';

const router = Router();
const userController = new UserController();

router.get('/:email', async (req, res) => {
    const user = await userController.getUserByEmail(req.params.email);

    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    res.send({user});
})

router.put('/premium/:uid', authorization('admin'), async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userController.findOneUser({_id:userId});

        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const newRole = user.role === 'user' ? 'premium' : 'user';
        await userController.updateUserNewRole(userId, newRole);

        res.send({ message: `Rol del usuario ${userId} cambiado a ${newRole}` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

router.post('/:uid/documents', uploader.single('file'), async (req, res) => {
    const userId = req.params.uid;
    const user = await userController.findOneUser({_id:userId});
    const folder = req.route.path.split('/')[2];
    const name = req.file.originalname

    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    if(!req.file){
        return res.status(400).send({status:"error", message:"No se puede guardar la imagen"})
    }

    uploadFile(name, folder, user)

    return res.status(200).send({ status: "success", message: "Archivo cargado exitosamente" });
});

export default router;