import { Router} from 'express';
import ProductManager from "../../dao/ProductManager.js";
//import __dirname from "../../utils.js"
import { productModel} from '../../dao/models/products.model.js'

const router = Router();

/*
//códigos para fs
//const productManager = new ProductManager(__dirname +'/products.json');
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
})*/

//códigos para db
router.get('/', async (req, res) => {
    try{
        const products = await productModel.find();
        res.send({result:"success", payload:products});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({
            status: 'error',
            message: error.message
        })
    }
})

router.get('/:pid', async (req, res) => {
    const id= req.params.pid;
    
    try{
        const product= await productModel.find({_id: id});
        res.status(201).send({
            status: 'success',
            payload: product
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({
            status: 'error',
            message: error.message
        })
    }
})

router.post('/', async (req, res) => {
    const { title, description, price, thumbnails, code, stock, category, status } = req.body;

    try{
        const result= await productModel.create({title, description, price, thumbnails, code, stock, category, status})
        res.status(201).send({
            status: 'success',
            payload: result
        });
    }catch (error){
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g, "'")
        });
    }
})

router.put('/:pid', async (req, res) => {
    const id= req.params.pid;
    const{title, description, price, thumbnails, code, stock, category, status } = req.body;

    try{
        const product= await productModel.find({_id: id});
        
        const updateProduct = {};
        if (product.length > 0) {
            updateProduct.title = title ? title : product.title;
            updateProduct.description = description ? description : product.description;
            updateProduct.price = price ? price : product.price;
            updateProduct.thumbnails = thumbnails ? thumbnails : product.thumbnails;
            updateProduct.code = code ? code : product.code;
            updateProduct.stock = stock ? stock : product.stock;
            updateProduct.category = category ? category : product.category;
            updateProduct.status = status ? status : product.status;
        }
        const result = await productModel.updateOne({_id:id}, updateProduct)

        res.status(200).send({
            status: 'success',
            payload: result
        });
    }catch{
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g, "'")
        })
    }
})

router.delete('/:pid', async(req, res)=>{
    const id = req.params.pid;

    const result = await productModel.deleteOne({_id:id});
    res.status(200).send({
        status: "success",
        payload: result,
    })
});

export default router;