import Products from '../dao/mongo/products.mongo.js';

const productsService = new Products();

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
          const result = await productsService.add(product);
          return result;
        } catch (err) {
            console.error('Error al guardar los productos en el archivo:', err);
        }
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

    const options = {
      page,
      limit,
      lean: true,
      sort: sortOptions,
    };

    try {
      const products = await productsService.paginate(filters, options);
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
    try {
      const productToUpdate = await productsService.getById(_id);
  
      if (!productToUpdate) {
        console.error('Producto no encontrado');
        return null;
      }
  
      if (product.title) {
        productToUpdate.title = product.title;
      }
      if (product.description) {
        productToUpdate.description = product.description;
      }
      if (product.price) {
        productToUpdate.price = product.price;
      }
      if (product.code) {
        productToUpdate.code = product.code;
      }
      if (product.stock) {
        productToUpdate.stock = product.stock;
      }
      if (product.category) {
        productToUpdate.category = product.category;
      }
      if (product.thumbnails) {
        productToUpdate.thumbnails = product.thumbnails;
      }
      if (product.status !== undefined) {
        productToUpdate.status = typeof product.status === 'string' ? product.status === 'true' : Boolean(product.status);
      }
  
      const result = await productsService.updateById({ _id }, productToUpdate);
      return result;
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      throw err; 
    }
  }

  async deleteProduct(_id) {
    try {
      const result = await productsService.deleteById(_id);
      return result
    }catch (err) {
      console.error('Error al leer el archivo de productos:', err);
    }
  }
}

export default ProductManager;