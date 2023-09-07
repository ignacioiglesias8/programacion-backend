import { Router } from 'express';
import CartManager from '../../dao/db/CartManagerDB.js';
import ProductManager from '../../dao/db/ProductManagerDB.js';

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();

    res.send({ cart });
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    res.send({cart});
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }

    const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }

        await cartManager.addProductToCart(cartId, product, 1);

        res.send(cart);
});

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const newCart = req.body;

    const result = await cartManager.updateCart(cartId, newCart);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.put('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity; 

    const result = await cartManager.updateQuantity(cartId, productId, newQuantity);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const result = await cartManager.deleteProductFromCart(cartId, productId);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const result = await cartManager.deleteAllProductsFromCart(cartId);

    if (result.error) {
        return res.status(404).send({ error: result.error });
    }

    res.send(result);
});

export default router;