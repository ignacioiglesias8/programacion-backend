import { Router } from 'express';
import routerProducts from './routes/products.js';
import routerCart from './routes/cart.js';

const router = Router();

router.use('/products', routerProducts);
router.use('/carts', routerCart);

export default router;