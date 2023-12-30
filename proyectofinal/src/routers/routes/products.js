import { Router} from 'express';
import { authorization } from '../../functions/auth.js';
import { generateProductErrorInfo } from '../../error/info.js';
import { createSearchParams } from '../../functions/searchParams.js';
import { sendEmailProductDeleted } from '../../functions/sendEmail.js';

import ProductController from '../../controllers/ProductController.js';
import UserController from '../../controllers/UserController.js';
import CustomError from '../../error/CustomError.js';
import ErrorCodes from '../../error/enums.js';

const router = Router();

const productController = new ProductController();
const userController = new UserController();

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const sort= req.query.sort;
    const category = req.query.category;
    const status = req.query.status;

    const products = await productController.showProducts(limit, sort, category, status, page);

    const response = createSearchParams(limit, sort, category, status, products)

    req.logger.info(response)

    res.send(response)
})

router.get('/:pid', async (req, res) => {
    const product = await productController.getProductById(req.params.pid);

    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    res.send({product});
})

router.post('/', authorization(['admin', 'premium']), async (req,res,next)=> {
    try{
        const { title, description, price, thumbnails, code, stock, category, owner } = req.body;

        if (!title || !description || !price || !code || !stock || !category) {
            CustomError.createError({
                name: 'Product creation error',
                cause: generateProductErrorInfo({title, description, price, code, stock, category}),
                message: 'Error trying to create Product',
                code: ErrorCodes.INVALID_TYPES_ERROR,
            });
        }

        const product = await productController.addProduct(title, description, price, thumbnails, code, stock, category, owner);

        res.send({
            status: 'success',
            payload: product
        });
    }catch (error){
        next(error);
    }
})

router.put('/:pid', authorization(['admin', 'premium']), async (req, res) => {
    const productId = req.params.pid;
    const modifications = req.body;

    const product = await productController.getProductById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }
    
    if (req.user.role === 'premium' && req.user.email !== product[0].owner) {
        return res.status(403).send({ error: 'No tiene permisos para modificar este producto' });
    }

    await productController.updateProduct(productId, modifications);
    const updatedProduct = await productController.getProductById(productId);
    
    res.send({ updatedProduct });
});

router.delete('/:pid', authorization(['admin', 'premium']), async (req, res) => {
    const productId = req.params.pid;

    const product = await productController.getProductById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    if (req.user.role === 'premium' && req.user.email !== product[0].owner) {
        return res.status(403).send({ error: 'No tiene permisos para eliminar este producto' });
    }

    const result = await productController.deleteProduct(productId);
    
    const user = await userController.getUserByEmail(product[0].owner);
    sendEmailProductDeleted(product, user)

    res.send({result, message: `El producto con Id ${productId} fue eliminado`});
})

export default router;