import { userModel } from '../models/users.model.js';

export default class Users {
    findByEmail = async (email) => {
        const result = await userModel.find(email).populate({
            path: 'cart.cartInfo',
            populate: {
                path: 'products.product'
            }
        });
        return result
    }

    createUserDB = async (userData) => {
        const result = await userModel.create(userData);
        return result;
    }

    findUserByQuery = async (query) => {
        const result = await userModel.findOne(query);
        return result;
    }

    addTicket = async (userId, ticketId) => {
        let result = await userModel.updateOne(
            { _id: userId },
            { $set: { ticket: { ticketInfo: ticketId } } },
        );
        return result;
    }

    removeTicket = async (userId) => {
        let result = await userModel.updateOne(
            { _id: userId },
            { $set: { ticket: [] } },
        );
        return result;
    }
}