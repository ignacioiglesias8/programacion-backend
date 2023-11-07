import express from 'express';

import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errors/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});