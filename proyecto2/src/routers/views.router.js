import { Router } from 'express';
import ProductManager from "../dao/db/ProductManagerDB.js";

const router = Router();

const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const sort= req.query.sort;
    const category = req.query.category;
    const status = req.query.status;
    const products = await productManager.getProducts(limit, sort, category, status);

    res.render(
        'home',
        {
            style: "home.css",
            products: products 
        }
    );
});

router.get('/chat', async (req, res) => {

    res.render(
        'chat',
        {
            style: "chat.css",
        }
    )
})

export default router;