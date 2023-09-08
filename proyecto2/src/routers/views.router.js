import { Router } from 'express';
import ProductManager from "../dao/db/ProductManagerDB.js";
import CartManager from '../dao/db/CartManagerDB.js';

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/products', async (req, res) => {
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

    const response = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&${queryString}` : '',
        nextLink: products.hasNextPage ? `/products?page=${products.nextPage}&${queryString}` : '',
    };

    res.render(
        'products',
        {
            style: "products.css",
            products: response 
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

router.get('/cart/:cid', async (req, res) => {
    const cart= await cartManager.getCartById(req.params.cid)

    const cartId = cart[0]._id.toString();

    res.render(
        'cart',
        {
            style: "cart.css",
            cartId: cartId,
            cart:cart
        }
    )
})

export default router;