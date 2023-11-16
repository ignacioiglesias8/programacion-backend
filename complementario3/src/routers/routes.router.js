import { Router } from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/cart.js';
import chatsRouter from './routes/chat.js';
import usersRouter from './routes/users.js';
import ticketsRouter from './routes/tickets.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/chats', chatsRouter);
router.use('/sessions', usersRouter);
router.use('/tickets', ticketsRouter)


export default router;