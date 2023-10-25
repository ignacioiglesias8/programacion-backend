import { productModel } from '../models/products.model.js';

export default class Product {
    add = async (product) => {
        let result = await productModel.create(product);
        return result;
    }
    paginate = async (filters, options) => {
        let result = await productModel.paginate(filters, options);
        return result;
    }
    getById = async (_id) => {
        let result = await productModel.findById(_id);
        return result;
    }
    updateById = async (_id, product) => {
        let result = await productModel.updateOne({_id}, product);
        return result;
    }
    deleteById = async (_id) => {
        let result = await productModel.deleteOne(_id);
        return result;
    }
}