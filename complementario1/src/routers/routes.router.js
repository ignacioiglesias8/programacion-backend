import { Router } from 'express';
import routerProducts from './routes/products.js';
import routerCart from './routes/cart.js';
import routerChat from './routes/chat.js';

const router = Router();

router.use('/products', routerProducts);
router.use('/carts', routerCart);
router.use('/chats', routerChat);

export default router;