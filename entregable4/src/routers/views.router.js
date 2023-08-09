import { Router } from 'express';
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();

    res.render(
        'home',
        {
            style: "index.css",
            products: products 
        }
    );
});

export default router;
