import express from 'express';
import routerProducts from './routes/products.js';
import routerCart from './routes/cart.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);

const PORT= 8080;
app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});