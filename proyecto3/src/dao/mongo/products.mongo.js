import { productModel } from '../models/products.model.js';

export default class Product {
    createDoc = async (product) => {
        let result = await productModel.create(product);
        return result;
    }

    paginateDocs = async (filters, options) => {
        let result = await productModel.paginate(filters, options);
        return result;
    }

    getDocById = async (_id) => {
        let result = await productModel.find(_id);
        return result;
    }

    updateDocById = async (_id, product) => {
        let result = await productModel.updateOne({_id}, product);
        return result;
    }
    
    deleteDocById = async (_id) => {
        let result = await productModel.deleteOne(_id);
        return result;
    }
}