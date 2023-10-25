import { cartModel } from '../models/carts.model.js';

export default class Cart {
    addCart = async (cart) => {
        let result = await cartModel.create(cart);
        return result;
    }
    getById = async (_id) => {
        let result = await cartModel.findById(_id);
        return result;
    }
    updateCart = async (_id, product) => {
        let result = await productModel.updateOne({_id}, product);
        return result;
    }
}