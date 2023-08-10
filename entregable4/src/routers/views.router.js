import { Router } from 'express';
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();

    res.render(
        'home',
        {
            style: "home.css",
            products: products 
        }
    );
});

router.get('/realtimeproducts', async (req, res) => {
    const realTimeProducts = await productManager.getProducts();

    res.render(
        'realTimeProducts',
        {
            style: "realtimeproducts.css",
            products: realTimeProducts
        }
    );
});

/*router.post('/realtimeproducts', async (req, res) => {
    const { title, description, price, thumbnails, code, stock, category, status } = req.body;
    const parsePrice = parseFloat(price);
    const parseStock = parseFloat(stock);
    const product = await productManager.addProduct(title, description, parsePrice, thumbnails, code, parseStock, category, status);

    socketServer.emit('product-created', product);
    res.redirect('/realtimeproducts');
});*/

export default router;