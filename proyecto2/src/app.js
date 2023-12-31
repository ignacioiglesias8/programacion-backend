import express from 'express';
import routesRouter from './routers/routes.router.js';
import viewsRouter from './routers/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import { messageModel} from './dao/db/models/messages.model.js';

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

const io = new Server(httpServer);

//websocket para chat
const messages = [];
io.on('connection', socket => {
    console.log('Nuevo cliente conectado ', socket.id);

    socket.on('message', async data => {
        try {
            await messageModel.create(data); 
        } catch (error) {
            console.error('Error al guardar el mensaje en la base de datos:', error.message);
        }
        messages.push(data);
        io.emit('messagesLogs', messages);
    });

    socket.on('userConnect', async data => {
        socket.emit('messagesLogs', await messageModel.find());
        socket.broadcast.emit('newUser', data);
    });
});