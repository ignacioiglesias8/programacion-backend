import { Router} from 'express';
//import ProductManager from "../../dao/fs/ProductManagerFS.js";
import ProductManager from "../../dao/db/ProductManagerDB.js";

const router = Router();

//const productManager = new ProductManager('./products.json');
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const order= req.query.sort;
    const category = req.query.category;
    const status = Boolean(req.query.status);
    const products = await productManager.getProducts(limit, order, category, status);

    res.send(products)
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