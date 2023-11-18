import {productsService} from '../repository/index.js'

class ProductController{

  async addProduct(title, description, price, thumbnails, code, stock, category, owner) {
    const status=true;

    const parsePrice = parseFloat(price);
    const parseStock = parseFloat(stock);

    const product = await productsService.createProduct(title, description, parsePrice, thumbnails, 
        code, parseStock, category, status, owner)

    return product
  }

  async showProducts(limit, order, category, status, page) {
    if (!limit) {
        limit = 10;
      }
    if (!page) {
        page = 1;
      }

    const pagination = await productsService.paginateProducts(limit, order, category, status, 
      page);
    
    return pagination;
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