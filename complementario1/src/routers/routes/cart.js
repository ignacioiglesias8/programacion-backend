import { Router } from 'express';
//import CartManager from '../../dao/fs/CartManagerFS.js';
//import ProductManager from '../../dao/fs/ProductManagerFS.js';
import CartManager from '../../dao/db/CartManagerDB.js';
import ProductManager from '../../dao/db/ProductManagerDB.js';

const router = Router();

//const cartManager = new CartManager('./carrito.json');
//const productManager = new ProductManager('./products.json');
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();

    res.send({ cart });
});

router.get('/:cid', async (req, res) => {
    const cartProducts = await cartManager.getCartById(req.params.cid);
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