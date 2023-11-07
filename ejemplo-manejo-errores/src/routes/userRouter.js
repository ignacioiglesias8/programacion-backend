import {Router} from 'express';
import CustomError from '../services/errors/CustomError.js';
import { generateUserErrorInfo, generateUserConsultErrorInfo } from '../services/errors/info.js';
import ErrorCodes from '../services/errors/enums.js';
const router = Router();

const users = [];

router.get('/:uid', (req, res) => {

    const uid = parseInt(req.params.uid);
    if (isNaN(uid) || uid < 0) {
        CustomError.createError({
            name: 'Invalid Params',
            cause: generateUserConsultErrorInfo(req.params.uid),
            message: 'Error to get user by ID',
            code: ErrorCodes.INVALID_PARAM
        });
    }

    const result = users.filter((user) => user.id == req.params.uid);
    res.send({
        status: 'success',
        payload: result
    });
});

router.get('/', (req, res) => {
    res.send({
        status: 'success',
        payload: users
    });
});

router.post('/', (req, res) => {
    const { first_name, last_name, age, email } = req.body;

    if (!first_name || !last_name || !email) {
        CustomError.createError({
            name: 'User creation error',
            cause: generateUserErrorInfo({ first_name, last_name, email }),
            message: 'Error trying to create User',
            code: ErrorCodes.INVALID_TYPES_ERROR
        });
    }

    const user = { first_name, last_name, age, email };

    //Build ID
    const id = users.length === 0 ? 1 : (users[users.length - 1].id + 1);
    user.id = id;

    users.push(user);

    res.send({
        status: 'success',
        payload: users
    });
});


export default router;