import { productModel } from '../db/models/products.model.js';

class ProductManager{

  async addProduct(title, description, price, thumbnails, code, stock, category) {
    const status=true;
  
    if (!title || !description || !price || !code || !stock || !category) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const product = {
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status,
        };

        try {
          const result = await productModel.create(product);
          return result;
        } catch (err) {
            console.error('Error al guardar los productos en el archivo:', err);
        }
    }

  async getProducts(limit, order, category, status) {
    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    const booleanStatus=Boolean(status)

    try {
      const products = await productModel.aggregate([
        {
          $match: {category: category, status:booleanStatus},
        },
        {
          $limit: limit, 
        },
        order === 'asc'? {$sort: { price: 1 }}: order === 'desc'? {$sort: { price: -1 }}: null,
      ]);
      return products;
    } catch (err) {
      console.error('Error al leer el archivo de productos:', err);
      return [];
    }
  }

    async getProductById(_id) {
      try {
        const product = await productModel.find({_id});  
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
      const products = await productModel.find({_id});
      let productUpdated = {};
  
      for (let key in products) {
          if (products[key].id == _id) {
            products[key].title = product.title ? product.title : products[key].title;
            products[key].description = product.description ? product.description : products[key].description;
            products[key].price = product.price ? product.price : products[key].price;
            products[key].code = product.code ? product.code : products[key].code;
            products[key].stock = product.stock ? product.stock : products[key].stock;
            products[key].category = product.category ? product.category : products[key].category;
            products[key].thumbnails = product.thumbnails ? product.thumbnails : products[key].thumbnails;
            if (product.status !== undefined) {
              products[key].status = typeof product.status === 'string' ? product.status === 'true' : Boolean(product.status);
            }
  
            productUpdated = products[key];
          }
      }
      const result = await productModel.updateOne({_id}, productUpdated);
      return result;
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      throw err; 
    }
  }

  async deleteProduct(_id) {
    try {
      const result = await productModel.deleteOne({_id});
      return result
    }catch (err) {
      console.error('Error al leer el archivo de productos:', err);
    }
  }
}

export default ProductManager;