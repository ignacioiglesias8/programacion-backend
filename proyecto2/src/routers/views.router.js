import { Router } from 'express';
import ProductManager from "../dao/db/ProductManagerDB.js";

const router = Router();

const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const sort= req.query.sort;
    const category = req.query.category;
    const status = req.query.status;

    const products = await productManager.getProducts(limit, sort, category, status, page);

    const queryParams = new URLSearchParams();
    if (limit) queryParams.set('limit', limit);
    if (sort) queryParams.set('sort', sort);
    if (category) queryParams.set('category', category);
    if (status) queryParams.set('status', status);

    const queryString = queryParams.toString();

    products.prevLink = products.hasPrevPage ? `/?page=${products.prevPage}&${queryString}` : '';
    products.nextLink = products.hasNextPage ? `/?page=${products.nextPage}&${queryString}` : '';

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