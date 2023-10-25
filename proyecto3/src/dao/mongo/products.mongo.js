import { productModel } from '../models/products.model.js';

export default class Product {
    add = async (product) => {
        let result = await productModel.create(product);
        return result;
    }
    getById = async (_id) => {
        let product = await productModel.findById(_id);
        return product;
    }
    update = async (_id, product) => {
        let result = await productModel.updateOne({_id}, product);
        return result;
    }
    deleteById = async (_id) => {
        let product = await productModel.deleteOne(_id);
        return product;
    }
}