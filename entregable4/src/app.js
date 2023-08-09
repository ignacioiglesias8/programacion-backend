import express from 'express';
import router from './router/router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const name = req.query.name ?? "Usuario";
    res.render(
        'index',
        {
            title: "Nacho",
            name: name
        }
    );
});

app.use(express.static(__dirname + '/../public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api', router);

const PORT= 8080;
app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});