import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';
import CartController from '../controllers/CartController.js';
import UserController from '../controllers/UserController.js';
import TicketController from '../controllers/TicketsController.js';
import { authorization } from '../functions/auth.js';
import { createHash, isValidPassword } from '../functions/bcrypt.js';

const router = Router();

const productController = new ProductController();
const cartController = new CartController();
const userController = new UserController();
const ticketsController = new TicketController();

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

router.post('/purchase', async (req, res) => {
    const user = await userController.getUserByEmail(req.session.user.email);
    const cartId = user[0].cart[0].cartInfo;
    const ticket = await ticketsController.generateTicket(cartId, req.session.user.email);

    res.json({ ticket })
});

router.get('/ticket', async (req, res) => {
    const user = await userController.getUserByEmail(req.session.user.email);
    const ticketId = user[0].ticket[0].ticketInfo;
    const ticket = await ticketsController.getTicketById(ticketId)

    const response = {
        code : ticket[0].code,
        purchase_datetime: ticket[0].purchase_datetime,
        amount: ticket[0].amount,
        user: ticket[0].purchaser,
    };

    res.render(
        'ticket',
        {
            ticket: response,
            style: "chat.css",
        }
    );
});

router.put('/tickets/finish', async (req, res) => {
    const user = await userController.getUserByEmail(req.session.user.email);
    const userId = user[0]._id;
    await ticketsController.deleteTicketFromUser(userId)

    res.send();
})

router.get('/chat', authorization('user'), async (req, res) => {

    res.render(
        'chat',
        {
            style: "chat.css",
        }
    )
})

router.get('/cart/:cid', async (req, res) => {
    const cart= await cartController.getCartById(req.params.cid)

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

router.get("/recovery", logged, async (req, res) => {

    res.render(
        'recovery',
        {
            title: "Recuperar contraseña",
            style: "index.css",
        }
    );
});

router.get('/recovery/:token', async (req, res) => {

    const timestampDiff = Date.now() - req.session.resetToken.timestamp;

    if (timestampDiff > 3600000){
        res.redirect('/recovery');
    }

    res.redirect('/reset');
});

router.get('/reset', async (req, res) => {
    try {
        const resetTokenRaw = req.session.resetToken;
        const resetToken = JSON.stringify(resetTokenRaw);

        res.render(
            'reset', 
            { 
                title: "Introducir nueva contraseña",
                style: "index.css",
                error: req.cookies.errorMessage ?? false,
                message: req.cookies.errorMessage ?? '',
                resetToken 
            }
        );
    }catch{
        return res.redirect('/recovery');
    }
})

router.post('/reset', async (req, res) => {
    const { resetToken, newPass } = req.body;
    
    try{
        const resetTokenParse = JSON.parse(resetToken);
        const userId = resetTokenParse.user.id;

        const user = await userController.getUserByEmail(resetTokenParse.user.email)

        if (isValidPassword({password: user[0].password}, newPass)) {
            return res.cookie('errorMessage', 'No se puede utilizar la misma contraseña', {maxAge: 6000}).redirect('reset');
        }

        const newPassword = createHash(newPass);

        await userController.updateUserNewPassword(userId, newPassword);

        return res.redirect('/login');
    }catch (error) {
        console.log(error);
        return res.redirect('/recovery');
    }
})

router.get('/manager', authorization(['admin', 'premium']), async (req, res) => {

    res.render(
        'manager',
        {
            title: "Gestión",
            style: "index.css",
        }
    );
});

router.get('/createproduct', authorization(['admin', 'premium']), async (req, res) => {

    const userEmail = req.user.email

    res.render(
        'createproduct',
        {
            title: "Crear un producto",
            style: "index.css",
            email: userEmail
        }
    );
});

router.get('/deleteproduct', authorization(['admin', 'premium']), async (req, res) => {

    res.render(
        'deleteproduct',
        {
            title: "Eliminar un producto",
            style: "index.css",
        }
    );
});

router.get('/updateproduct', authorization(['admin', 'premium']), async (req, res) => {

    res.render(
        'updateproduct',
        {
            title: "Modificar un producto",
            style: "index.css",
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