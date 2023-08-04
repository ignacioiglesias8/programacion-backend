import fs from 'fs';

class ProductManager{
    constructor(filePath) {
        this.products = [];
        this.lastId = 0;
        this.path = filePath;
    }

    async addProduct(title, description, price, thumbnails, code, stock, category, status = true) {
        if (!title || !description || !price || !code || !stock || !category) {
          //no se comprende si status también debe ser obligatorio en esta parte
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

    async getProductById(id) {
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

    async updateProduct(id, fieldToUpdate, newValue) {
      try {
        const data = await fs.promises.readFile(this.path, 'utf8');
        const products = JSON.parse(data);
        const productToUpdate = products.find((product) => product.id === id);
  
        if (productToUpdate) {
          productToUpdate[fieldToUpdate] = newValue;
  
          await fs.promises.writeFile(this.path, JSON.stringify(products));
        } else {
          console.error('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al leer o escribir el archivo de productos:', err);
      }
    }

    async deleteProduct(id) {
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