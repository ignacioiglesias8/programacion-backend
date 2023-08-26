import express from 'express';
import routesRouter from './routers/routes.router.js';
import viewsRouter from './routers/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import ProductManager from './dao/ProductManager.js';
import mongoose from 'mongoose';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/../public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri= "mongodb+srv://ignacioiglesias8:9HzbVxanl92pkney@cluster0.paoiaa9.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(uri)

app.use('/api', routesRouter);
app.use('/', viewsRouter);

const PORT= 8080;
const httpServer = app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});

const productManager = new ProductManager(__dirname + '/products.json');

const io = new Server(httpServer);

//websocket para realTimeProducts
io.on('connection', async socket=>{
    console.log('Nuevo cliente conectado')

    const products = await productManager.getProducts();
    io.emit('loadproducts', products);

    socket.on('sendProduct', async data=>{
        
        const product = await productManager.addProduct(
            data.title,
            data.description,
            parseFloat(data.price),
            data.thumbnails,
            data.code,
            parseFloat(data.stock),
            data.category,
            data.status
        );
        io.emit('showProduct', product);
    })

    socket.on('deleteProduct', async data => {
        const productId = parseInt(data.id);
        await productManager.deleteProduct(productId);

        const updatedProducts = await productManager.getProducts();
        io.emit('loadproducts', updatedProducts);
    });
});

//websocket para chat
const messages = [];
io.on('connection', socket => {
    console.log('Nuevo cliente conectado ', socket.id);

    socket.on('message', data => {
        messages.push(data);
        io.emit('messagesLogs', messages);
    });

    socket.on('userConnect', data => {
        socket.emit('messagesLogs', messages);
        socket.broadcast.emit('newUser', data);
    })
});