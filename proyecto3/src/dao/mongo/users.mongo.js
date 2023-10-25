import { userModel } from '../models/users.model.js';

export default class Users {
    findByEmail = async (email) => {
        const result = await userModel.find({ email: email });
        return result
    }

    createNew = async (userData) => {
        const result = await userModel.create(userData);
        return result;
    }

    findUser = async (query) => {
        const result = await userModel.findOne(query);
        return result;
    }
}