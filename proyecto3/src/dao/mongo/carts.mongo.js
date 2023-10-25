import { cartModel } from '../models/carts.model.js';

export default class Cart {
    addCart = async (cart) => {
        let result = await cartModel.create(cart);
        return result;
    }

    populateCart = async (_id) => {
        let result = await cartModel.findById(_id).populate('products.product');
        return result;
    }

    getCartById = async (_id) => {
        let result = await cartModel.findById(_id);
        return result;
    }

    modifyCart = async (cartId, newCart) => {
        const result = await cartModel.updateOne(
            { _id: cartId },
            { $set: { products: newCart.products } }
        );
        return result;
    }

    modifyQuantity = async (cartId, productId, newQuantity) => {
        const result = await cartModel.updateOne(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': newQuantity } }
        );
        return result;
    }

    removeOneProduct = async (cartId, productId) => {
        const result = await cartModel.updateOne(
            { _id: cartId },
            { $pull: { products: { product: productId } } }
        );
        return result;
    }

    removeAllProducts = async (cartId) => {
        const result = await cartModel.updateOne(
            { _id: cartId },
            { $set: { products: [] } }
        );
        return result;
    }
}