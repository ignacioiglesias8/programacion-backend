import {Router } from 'express';
import { authorization } from '../../functions/auth.js';
import { uploader, getCurrentDate } from '../../middlewares/multerConfig.js';
import { uploadFile } from '../../functions/uploadFile.js';
import { sendEmailUserDeleted } from '../../functions/sendEmail.js';
import UserController from '../../controllers/UserController.js';
import CartController from '../../controllers/CartController.js';

const router = Router();
const userController = new UserController();
const cartController = new CartController();

router.get('/:email', async (req, res) => {
    const user = await userController.getUserByEmail(req.params.email);

    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    res.send({user});
})

router.get('/premium/:uid', authorization('admin'), async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userController.findOneUser({_id:userId});

        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const requiredDocuments = ['id', 'address', 'account'];

        const hasAllDocuments = requiredDocuments.every(doc => {
            return user.documents.some(document => document.name.includes(doc));
        });

        if (!hasAllDocuments) {
            return res.status(400).send({ error: 'El usuario no ha cargado todos los documentos requeridos' });
        }

        const newRole = user.role === 'user' ? 'premium' : 'user';
        await userController.updateUserNewRole(userId, newRole);

        res.send({ message: `Rol del usuario ${userId} cambiado a ${newRole}` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

router.post('/:uid/documents', getCurrentDate, uploader.single('file'), async (req, res) => {
    const userId = req.params.uid;
    const user = await userController.findOneUser({_id:userId});
    const folder = req.route.path.split('/')[2];
    const type = req.body.type
    const date = req.currentDate
    const name = req.file.originalname

    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    if(!req.file){
        return res.status(400).send({status:"error", message:"No se puede guardar la imagen"})
    }

    uploadFile(folder, user, type, date, name)

    return res.status(200).send({ status: "success", message: "Archivo cargado exitosamente" });
});

router.get('/', async (req, res) => {
    const users = await userController.getUsers();
    const usersToShow = await userController.showUsers(users);

    res.send(usersToShow)
})

router.delete('/', authorization(['admin']), async (req, res) => {
    const users = await userController.getUsers();

    const thresholdTime = new Date();
    thresholdTime.setDate(thresholdTime.getDate() - 2);

    const usersToDelete = users.filter(user => new Date(user.last_connection) < thresholdTime);

    for (const user of usersToDelete) {
        await cartController.deleteCart(user.cart[0].cartInfo._id)
        await userController.deleteUser(user._id);
        sendEmailUserDeleted(user)
    }

    res.send({ message: `Los usuarios inactivos fueron eliminados` });
});

router.delete('/:uid', authorization(['admin']), async (req, res) => {
    const userId = req.params.uid;
    const user = await userController.findOneUser({_id:userId});

    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    await cartController.deleteCart(user.cart[0].cartInfo._id)
    await userController.deleteUser(userId);

    res.send({message: `El usuario ${user.email} fue eliminado`});
})

export default router;