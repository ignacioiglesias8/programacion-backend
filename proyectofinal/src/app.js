import 'dotenv/config'; 
import express from 'express';
import session from 'express-session';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import routesRouter from './routers/routes.router.js';
import viewsRouter from './routers/views.router.js';
import testsRouter from './routers/tests.router.js'
import ChatController from './controllers/ChatController.js';
import initializatePassport from './config/passport.config.js';
/*import errorHandler from './middlewares/errorHandler.js'*/
import __dirname from './utils.js';
import { addLogger } from './middlewares/logger.js';

const app = express();
const uri= process.env.MONGO_URL
const PORT= process.env.PORT||8080;

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(uri)
app.use(session(
    {
        store: mongoStore.create({
            mongoUrl: uri,
            mongoOptions: {useUnifiedTopology: true},
            ttl: 10000
        }),
        secret: 'secretPhrase',
        resave: false,
        saveUninitialized: false
    }
));

const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: "Documentación",
            description: "API para gestionar packs turísticos",
        }
    },
    apis:[`${__dirname}/../docs/**/*.yaml`],
}

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger);

app.use('/api', routesRouter);
app.use('/', viewsRouter);
app.use('/tests', testsRouter)

/*app.use(errorHandler);*/

const httpServer = app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});

const io = new Server(httpServer);

//websocket para chat
const messages = [];
const chatController = new ChatController();
io.on('connection', socket => {
    console.log('Nuevo cliente conectado ', socket.id);

    socket.on('message', async data => {
        try {
            await chatController.saveChat(data); 
        } catch (error) {
            console.error('Error al guardar el mensaje en la base de datos:', error.message);
        }
        messages.push(data);
        io.emit('messagesLogs', messages);
    });

    socket.on('userConnect', async data => {
        socket.emit('messagesLogs', await chatController.getChats());
        socket.broadcast.emit('newUser', data);
    });
});