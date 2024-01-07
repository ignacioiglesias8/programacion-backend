import { Router } from 'express';
import { authorization } from '../../functions/auth.js';

const router = Router();

router.get('/manager', authorization(['admin', 'premium']), async (req, res) => {

    const user = req.session.user;
    const isAdmin = user.role === 'admin';

    res.render(
        'manager',
        {
            title: "Gestión",
            style: "index.css",
            isAdmin
        }
    );
});

router.get('/productmanager', authorization(['admin', 'premium']), async (req, res) => {

    res.render(
        'productmanager',
        {
            title: "Gestión de productos",
            style: "index.css",
        }
    );
});

router.get('/createproduct', authorization(['admin', 'premium']), async (req, res) => {

    const userEmail = req.user.email

    res.render(
        'createproduct',
        {
            title: "Crear un producto",
            style: "index.css",
            email: userEmail
        }
    );
});

router.get('/deleteproduct', authorization(['admin', 'premium']), async (req, res) => {

    res.render(
        'deleteproduct',
        {
            title: "Eliminar un producto",
            style: "index.css",
        }
    );
});

router.get('/updateproduct', authorization(['admin', 'premium']), async (req, res) => {

    res.render(
        'updateproduct',
        {
            title: "Modificar un producto",
            style: "index.css",
        }
    );
});

router.get('/usermanager', authorization(['admin']), async (req, res) => {

    res.render(
        'usermanager',
        {
            title: "Gestionar usuarios",
            style: "index.css",
        }
    );
});

router.get('/cartmanager', authorization(['admin']), async (req, res) => {

    res.render(
        'cartmanager',
        {
            title: "Gestionar carritos",
            style: "index.css",
        }
    );
});

router.get('/ticketsearch', async (req, res) => {

    res.render(
        'ticketsearch',
        {
            title: "Buscador de tickets",
            style: "index.css",
        }
    );
});

export default router;