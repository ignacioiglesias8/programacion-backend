import { Router} from 'express';
import ProductManager from "../../dao/db/ProductManagerDB.js";

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
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

    res.send(response)
})

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);

    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    res.send({product});
})

router.post('/', async (req,res)=> {
    const { title, description, price, thumbnails, code, stock, category, status } = req.body;

    const parsePrice = parseFloat(price);
    const parseStock = parseFloat(stock);

    const product = await productManager.addProduct(title, description, parsePrice, thumbnails, code, parseStock, category, status);

    res.send({product})
})

router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const modifications = req.body;

    const product = await productManager.getProductById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    await productManager.updateProduct(productId, modifications);
    const updatedProduct = await productManager.getProductById(productId);
    
    res.send({ updatedProduct });
});

router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const product = await productManager.deleteProduct(productId);

    res.send({product, message: `El producto con Id ${productId} fue eliminado`});
})

export default router;