import { productModel } from '../models/products.model.js';

export default class Product {
    get = async () => {
        let products = await productModel.find();
        return products
    }
}