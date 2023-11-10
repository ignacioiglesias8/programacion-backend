import { Router } from 'express';
import CartController from '../../controllers/CartController.js';
import ProductController from '../../controllers/ProductController.js';
import TicketController from '../../controllers/TicketsController.js';

const router = Router();

const cartController = new CartController();
const productController = new ProductController();
const ticketController = new TicketController();

router.post('/', async (req, res) => {
    const cart = await cartController.addCartToUser();

    res.send({ cart });
});

router.get('/:cid', async (req, res) => {
    const cart = await cartController.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    res.send({cart});
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await cartController.getCartById(cartId);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }

    const product = await productController.getProductById(productId);
        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }

    await cartController.addProductToCart(cartId, product, 1);

    res.send(cart);
});

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const newCart = req.body;

    const result = await cartController.updateCart(cartId, newCart);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.put('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity; 

    const result = await cartController.updateQuantity(cartId, productId, newQuantity);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const result = await cartController.deleteProductFromCart(cartId, productId);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const result = await cartController.deleteAllProductsFromCart(cartId);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.get('/:cid/purchase', async (req, res) => {
    const ticket = await ticketController.generateTicket(req.params.cid, req.session.user.email);

    res.send({ ticket });
});

export default router;