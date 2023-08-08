import express from 'express';
import router from '../router/router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('../public'));

app.use('/api', router);

const PORT= 8080;
app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});