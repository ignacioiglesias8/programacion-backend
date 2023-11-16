import { Router } from 'express';
import productsMocks from './testingRoutes/productsMocks.js';
import loggers from './testingRoutes/loggersTesting.js';

const router = Router();

router.use('/mockingproducts', productsMocks);
router.use('/loggertest', loggers);

export default router;