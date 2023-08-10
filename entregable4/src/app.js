import express from 'express';
import routesRouter from './routers/routes.router.js';
import viewsRouter from './routers/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/../public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', routesRouter);
app.use('/', viewsRouter);

const PORT= 8080;
const httpServer = app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado')
    socket.on('message', data=>{
        console.log(data)
    })
});