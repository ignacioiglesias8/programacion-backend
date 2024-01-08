import { Router } from 'express';
import ProductController from '../../controllers/ProductController.js';
import CartController from '../../controllers/CartController.js';
import UserController from '../../controllers/UserController.js';
import { authorization } from '../../functions/auth.js';

const router = Router();

const productController = new ProductController();
const cartController = new CartController();
const userController = new UserController();

router.get('/products', auth, async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const sort= req.query.sort;
    const category = req.query.category;
    const status = req.query.status;

    const products = await productController.showProducts(limit, sort, category, status, page);

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

    const user = req.session.user;
    const isAuth = user.role === 'admin' || user.role === 'premium';

    res.render(
        'products',
        {
            style: "products.css",
            products: response,
            user: req.session.user,
            isAuth,
        }
    );
});

let cart = {};

router.post('/addToCart', authorization(['user', 'premium']), async (req, res) => {
    const productId = req.body.productId;
    const product = await productController.getProductById(productId);
    const user = await userController.getUserByEmail(req.session.user.email);
    const cart = user[0].cart[0].cartInfo._id.toString();

    if (req.user.role === 'premium' && product[0].owner === req.user.email) {
        return res.status(403).send({ error: 'No puedes agregar tu propio producto al carrito' });
    }

    await cartController.addProductToCart(cart, product, 1);   

    res.status(204).send();
});

function auth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

export default router;