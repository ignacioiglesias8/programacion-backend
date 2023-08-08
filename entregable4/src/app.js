import express from 'express';
import router from './router/router.js';
import handlebars from 'handlebars';
//import __dirname from './utils.js';

const app = express();

app.engine('handlebars', handlebars.engine());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('../public'));

app.use('/api', router);

const PORT= 8080;
app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});