import { Router } from 'express';
import ProductManager from "../dao/db/ProductManagerDB.js";
import CartManager from '../dao/db/CartManagerDB.js';
import UserManager from '../dao/db/UserManagerDB.js';

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();
const userManager = new UserManager();

router.get('/products', auth, async (req, res) => {
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
            products: response,
            user: req.session.user 
        }
    );
});

let cart = {};

router.post('/addToCart', async (req, res) => {
    const productId = req.body.productId;
    const product = await productManager.getProductById(productId);
    const user = await userManager.getUserByEmail(req.session.user.email);
    const cart = user[0].cart[0].cartInfo._id.toString();

    await cartManager.addProductToCart(cart, product, 1);   

    res.status(204).send();
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

    const products = cart[0].products.map((item) => ({
        title: item.product.title,
        description: item.product.description,
        price: item.product.price,
        id: item.product._id,
        quantity: item.quantity,
    }));

    res.render(
        'cart',
        {
            style: "cart.css",
            cartId: cartId,
            products: products,
        }
    )
})

router.get("/", auth, async (req, res) => {
    res.render(
        'index',
        {
            style: "index.css",
            user: req.session.user
        }
    );
});

router.get("/login", logged, async (req, res) => {

    res.render(
        'login',
        {
            style: "index.css",
            loginFailed: req.session.loginFailed ?? false,
            registerSuccess: req.session.registerSuccess ?? false
        }
    );
});

router.get("/register", logged, async (req, res) => {

    res.render(
        'register',
        {
            style: "index.css",
            registerFailed: req.session.registerFailed ?? false
        }
    );
});

function auth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

function logged(req, res, next) {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
}

export default router;