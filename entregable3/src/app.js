import express from 'express';
import ProductManager from "./ProductManager.js";

//const productManager = new ProductManager();

const app = express();
const PORT= 8080;

app.use(express.urlencoded({extended:true}));

const products = [
    {
        id: "1",
        title: "producto prueba 1",
        description: "Este es un producto prueba",
        price: 100,
        thumbnail: "Sin imagen",
        code: "abc101",
        stock: 25
    },
    {
        id: "2",
        title: "producto prueba 2",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc102",
        stock: 25
    },
    {
        id: "3",
        title: "producto prueba 3",
        description: "Este es un producto prueba",
        price: 300,
        thumbnail: "Sin imagen",
        code: "abc103",
        stock: 25
    }
]

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    let productsToSend = products;
    
    if (!isNaN(limit)) {
        productsToSend = products.slice(0, limit);
    }

    res.send(productsToSend)
})

app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid;
    
    let product = products.find((product)=>product.id === productId);
    
    if (!product) {
        return res.send({
            error: 'Product not found'
        });
    }

    res.send({product});
})

app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});