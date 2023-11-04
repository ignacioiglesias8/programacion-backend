import {productsService} from '../repository/index.js'
import CustomError from '../errorHandler/CustomError.js';
import ErrorCodes from '../errorHandler/enums.js';
import { generateProductErrorInfo } from '../errorHandler/info.js';

class ProductController{

  async addProduct(title, description, price, thumbnails, code, stock, category) {
    const status=true;
  
    if (!title || !description || !price || !code || !stock || !category) {
        CustomError.createError({
          name: 'Product creation error',
          cause: generateProductErrorInfo({title, description, price, code, stock, category}),
          message: 'Error trying to create product',
          code: ErrorCodes.INVALID_TYPES_ERROR,
          });
        }

        const product = await productsService.createProduct(title, 
            description, 
            price, 
            thumbnails, 
            code, 
            stock, 
            category, 
            status)

        return product
    }

  async getProducts(limit, order, category, status, page) {
    if (!limit) {
      limit = 10;
    }
    if (!page) {
        page = 1;
    }

    const filters = {};
    if (category) {
      filters.category = category;
    }
    if (status !== undefined) {
      filters.status = status;
    }

    const sortOptions = {};
    if (order === 'asc') {
      sortOptions.price = 1;
    } else if (order === 'desc') {
      sortOptions.price = -1;
    }

    try {
      const products = await productsService.paginateProducts(filters, {
        page,
        limit,
        lean: true,
        sort: sortOptions,
      });
      console.log(products)
      return products;
    } catch (err) {
      console.error('Error al leer el archivo de productos:', err);
      return [];
    }
  }

    async getProductById(_id) {
      try {
        const product = await productsService.getById({_id});  
        if (product) {
          return product;
        } else {
          console.error('Producto no encontrado');
          return null;
        }
      } catch (err) {
        console.error('Error al leer el archivo de productos:', err);
        return null;
      }
  }

  async updateProduct(_id, product) {
    try{
      let result = await productsService.updateById(_id, product);
      return result
    }catch(err){
      console.error('Error al leer el archivo de productos:', err);
    }
  }

  async deleteProduct(_id) {
    try {
      const result = await productsService.deleteById({_id});
      return result
    }catch (err) {
      console.error('Error al leer el archivo de productos:', err);
    }
  }
}

export default ProductController;