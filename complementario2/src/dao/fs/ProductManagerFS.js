import fs from 'fs';

class ProductManager{
    constructor(filePath) {
        this.products = [];
        this.lastId = 0;
        this.path = filePath;
    }

    async addProduct(title, description, price, thumbnails, code, stock, category) {
        const status=true;
      
        if (!title || !description || !price || !code || !stock || !category) {
                console.error('Todos los campos son obligatorios');
                return;
            }

            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);

            const existingProduct = this.products.find((product) => product.code === code);
                if (existingProduct) {
                console.error(`El código "${code}" ya está en uso`);
                return;
            }

            const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
            const id = lastProductId + 1;

            if (typeof thumbnails === 'string') {
                thumbnails = [thumbnails];
            }

            const product = {
                id,
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                category,
                status,
            };

            this.products.push(product);

            const productsData = JSON.stringify(this.products);
            try {
                await fs.promises.writeFile(this.path, productsData);
            } catch (err) {
                console.error('Error al guardar los productos en el archivo:', err);
            }
        }

    async getProducts() {
      if (this.products.length > 0) {
        return this.products;
      }else{
        try {
          const data = await fs.promises.readFile(this.path, 'utf8');
          const products = JSON.parse(data);
          this.products = products;
          console.log(products);
  
          return products;
        } catch (err) {
          console.error('Error al leer el archivo de productos:', err);
          return [];
        }}
      }

    async getProductById(_id) {
      const id = parseInt(_id);

        try {
          const data = await fs.promises.readFile(this.path, 'utf8');
          const products = JSON.parse(data);
          this.products = products;
      
          const product = this.products.find((product) => product.id === id);
          if (product) {
            console.log(product);
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
      const products = await this.getProducts();
      let productUpdated = {};
      const id = parseInt(_id);

      for (let key in products) {
          if (products[key].id == id) {
            products[key].title = product.title ? product.title : products[key].title;
            products[key].description = product.description ? product.description : products[key].description;
            products[key].price = product.price ? parseInt(product.price) : products[key].price;
            products[key].code = product.code ? product.code : products[key].code;
            products[key].stock = product.stock ? parseInt(product.stock) : products[key].stock;
            products[key].category = product.category ? product.category : products[key].category;
            if (Array.isArray(product.thumbnails)) {
              products[key].thumbnails = product.thumbnails;
            } else if (product.thumbnails) {
              products[key].thumbnails = [product.thumbnails];
            } else {
              products[key].thumbnails = [];
            }
            if (product.status !== undefined) {
              products[key].status = typeof product.status === 'string' ? product.status === 'true' : Boolean(product.status);
            }

            productUpdated = products[key];
          }
      }

      try {
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
          return productUpdated;
      } catch(e) {
          return {
              message: "Error al actualizar usuario!"
          };
      }
    }

    async deleteProduct(_id) {
      const id = parseInt(_id)
      
      try {
        const data = await fs.promises.readFile(this.path, 'utf8');
        const products = JSON.parse(data);
  
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
          products.splice(index, 1);
  
          const productsData = JSON.stringify(products);
          await fs.promises.writeFile(this.path, productsData);
        } else {
          console.error('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al leer el archivo de productos:', err);
      }
    }
}

export default ProductManager;