import { Router } from 'express';
import CartManager from '../../dao/CartManager.js';
import ProductManager from '../../dao/ProductManager.js';
import { cartModel} from '../../dao/models/carts.model.js'
import { productModel} from '../../dao/models/products.model.js'


const router = Router();
/*
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
});*/

//este no esta funcionando
router.post('/', async (req, res) => {
    try{
        const cart = await cartModel.create([]);
        res.status(201).send({
            status: 'success',
            payload: cart
        });
    }catch (error){
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g, "'")
        });
    }
});

//este si esta funcionando
router.get('/:cid', async (req, res) => {
    const id = req.params.cid;

    try{
        const cart= await cartModel.find({_id: id});
        res.status(201).send({
            status: 'success',
            payload: cart
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({
            status: 'error',
            message: error.message
        })
    }
})

export default router;