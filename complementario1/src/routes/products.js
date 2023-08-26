import { Router} from 'express';
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    let showProducts = products;
    
    if (!isNaN(limit)) {
        showProducts = products.slice(0, limit);
    }

    res.send(showProducts)
})

router.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

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
    const productId = parseInt(req.params.pid);
    const modifications = req.body;

    const product = await productManager.getProductById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    await productManager.updateProduct(productId, modifications);
    
    res.send({ product });
});

router.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.deleteProduct(productId);

    res.send({product, message: `El producto con Id ${productId} fue eliminado`});
})

export default router;