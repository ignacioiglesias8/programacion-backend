import { Router } from 'express';
import CartController from '../../controllers/CartController.js';
import UserController from '../../controllers/UserController.js';
import TicketController from '../../controllers/TicketsController.js';

const router = Router();

const cartController = new CartController();
const userController = new UserController();
const ticketsController = new TicketController();

router.get('/cart', async (req, res) => {

    const user = await userController.getUserByEmail(req.session.user.email)
    const cart = await cartController.getCartById(user[0].cart[0].cartInfo._id)
    
    const cartId = cart[0]._id.toString();
    const products = cart[0].products.map((item) => ({
        title: item.product.title,
        description: item.product.description,
        price: item.product.price,
        id: item.product._id,
        quantity: item.quantity,
    }));

    res.render(
        'cart',
        {
            title: "Carrito de compras",
            style: "index.css",
            cartId: cartId,
            products: products
        }
    );
});

router.post('/purchase', async (req, res) => {
    const user = await userController.getUserByEmail(req.session.user.email);
    const cartId = user[0].cart[0].cartInfo;
    const ticket = await ticketsController.generateTicket(cartId, req.session.user.email);

    res.json({ ticket })
});

export default router;