import { Router } from 'express';
//import ProductManager from "../dao/ProductManager.js";
import { productModel} from '../dao/models/products.model.js'

const router = Router();

//const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    //código para fs
    //const products = await productManager.getProducts();
    const products = await productModel.find();
    const plainProducts = JSON.parse(JSON.stringify(products));

    res.render(
        'home',
        {
            style: "home.css",
            products: plainProducts 
        }
    );
});

router.get('/realtimeproducts', async (req, res) => {
    //código para fs
    //const realTimeProducts = await productManager.getProducts();
    const products = await productModel.find();
    const plainProducts = JSON.parse(JSON.stringify(products));

    res.render(
        'realTimeProducts',
        {
            style: "realtimeproducts.css",
            products: plainProducts
        }
    );
});

router.get('/chat', async (req, res) => {

    res.render(
        'chat',
        {
            style: "chat.css",
        }
    )
})

export default router;