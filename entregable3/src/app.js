import express from 'express';
import ProductManager from "./ProductManager.js";

const app = express();
const PORT= 8080;

const productManager = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', (req, res) => {
    const products = productManager.getProducts();
    const limit = parseInt(req.query.limit);
    let productsToSend = products;
    
    if (!isNaN(limit)) {
        productsToSend = products.slice(0, limit);
    }

    res.send(productsToSend)
})

app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (!product) {
        return res.send({
            error: 'Producto no encontrado'
        });
    }

    res.send({product});
})

app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});