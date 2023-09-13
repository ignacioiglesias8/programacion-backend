import { Router } from 'express';
import routerProducts from './routes/products.js';
import routerCart from './routes/cart.js';
import routerChat from './routes/chat.js';
import sessionRouter from './routers/session.router.js';
import userRouter from './routers/user.router.js';

const router = Router();

router.use('/products', routerProducts);
router.use('/carts', routerCart);
router.use('/chats', routerChat);
router.use('/api/sessions', sessionRouter)
router.use('/api/user', userRouter)

export default router;