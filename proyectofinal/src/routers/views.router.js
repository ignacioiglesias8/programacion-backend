import { Router } from 'express';
import productsViewsRouter from './viewsRoutes/productsView.js';
import profileViewsRouter from './viewsRoutes/profileView.js';
import cartViewsRouter from './viewsRoutes/cartView.js';
import ticketViewsRouter from './viewsRoutes/ticketView.js';
import chatViewsRouter from './viewsRoutes/chatView.js';
import sessionsViewsRouter from './viewsRoutes/sessionsView.js';
import managerViewsRouter from './viewsRoutes/managerView.js';

const router = Router();

router.use('/', productsViewsRouter);
router.use('/', profileViewsRouter);
router.use('/', cartViewsRouter);
router.use('/', ticketViewsRouter);
router.use('/', chatViewsRouter);
router.use('/', sessionsViewsRouter);
router.use('/', managerViewsRouter);

export default router;