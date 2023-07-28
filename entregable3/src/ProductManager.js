import fs from 'fs';

class ProductManager{
    constructor(filePath) {
        this.products = [];
        this.lastId = 0;
        this.path = filePath;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.error('Todos los campos son obligatorios');
                return;
            }

            const existingProduct = this.products.find((product) => product.code === code);
                if (existingProduct) {
                console.error(`El código "${code}" ya está en uso`);
                return;
            }

            const id = ++this.lastId;

            const product = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.products.push(product);

            const productsData = JSON.stringify(this.products);
            try {
                fs.writeFileSync(this.path, productsData);
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

    updateProduct(id, fieldToUpdate, newValue) {
      try {
        const data = fs.readFileSync(this.path, 'utf8');
        const products = JSON.parse(data);
        const productToUpdate = products.find((product) => product.id === id);
  
        if (productToUpdate) {
          productToUpdate[fieldToUpdate] = newValue;
  
          fs.writeFileSync(this.path, JSON.stringify(products));
        } else {
          console.error('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al leer o escribir el archivo de productos:', err);
      }
    }

    deleteProduct(id) {
      try {
        const data = fs.readFileSync(this.path, 'utf8');
        const products = JSON.parse(data);
  
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
          products.splice(index, 1);
  
          const productsData = JSON.stringify(products);
          fs.writeFileSync(this.path, productsData);
        } else {
          console.error('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al leer el archivo de productos:', err);
      }
    }
}

export default ProductManager;

/*
console.log(new ProductManager().getProducts());
//A través de este console.log se demuestra el retorno de un arreglo vacío.
const productManager = new ProductManager('./products.json');

productManager.addProduct("producto prueba 1", "Este es un producto prueba", 100, "Sin imagen", "abc101", 25);
productManager.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'Sin imagen', 'abc102', 25);
//En lugar de agregar un producto, se agregaron dos para chequear que el id se genere automaticamente.

productManager.getProducts();
//Comparación de que ambos productos hayan sido agregados correctamente.

productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc101', 25);
//Se vuelve a agregar un producto con el mismo code para comprobar que de error.

productManager.getProductById(3);
productManager.getProductById(2);
//Se buscan por id dos productos. El id 3 al no existir, debe dar un error de no encontrado.
//El producto id 2 debe ser encontrado y mostrado en consola.

productManager.updateProduct(2, 'price', 250);
productManager.deleteProduct(1);
//El precio del producto con Id 2 fue actualizado.
//Se eliminó el producto con id 1.

productManager.getProducts();
//Se llama nuevamente a getProducts para comprobar el funcionamiento de updateProduct y deleteProduct.

productManager.deleteProduct(3);
//Se intenta eliminar un producto que no existe para comprobar el error.
*/