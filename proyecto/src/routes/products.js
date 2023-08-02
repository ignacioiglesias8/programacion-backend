import { Router} from 'express';
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    let productsToSend = products;
    
    if (!isNaN(limit)) {
        productsToSend = products.slice(0, limit);
    }

    res.send(productsToSend)
})

router.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
        return res.send({
            error: 'Producto no encontrado'
        });
    }

    res.send({product});
})

router.post('/', (req,res)=> {
    const product = {
        id: req.body.id ?? 'Sin nombre',
        title : req.body.title ?? 'Sin curso',
        description: req.body.description ?? 'Sin descripción',
        code: req.body.code ?? 'Sin código',
        price: req.body.price ?? 'Sin precio',
        status: true,
        stock: req.body.stock ?? 'Sin stock',
        category: req.body.category ?? 'Sin categoría',
        thumbnails: req.body.thumbnails ?? 'Sin imagen'
    }

    users.push(product);

    res.status(201).send ('Producto agregado correctamente')
})

export default router;