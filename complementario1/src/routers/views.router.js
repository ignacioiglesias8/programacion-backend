import { Router } from 'express';
import ProductManager from "../dao/ProductManager.js";

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

export default router;