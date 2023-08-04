import { Router } from 'express';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';

const router = Router();

const cartManager = new CartManager('./carrito.json');
const productManager = new ProductManager('./products.json');

router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();

    res.send({ cart });
});

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cartProducts = await cartManager.getCartById(cartId);
    if (!cartProducts) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    res.json(cartProducts);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }

    const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }

        await cartManager.addProductToCart(cartId, productId, 1);

        res.send(cart);
});

export default router;