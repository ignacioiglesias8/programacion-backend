class ProductManager{
    constructor() {
        this.products = [];
        this.lastId = 0;
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
            console.log('Producto agregado:', product);
        }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            console.log(product);
            return product;
        } else {
            console.error('Producto no encontrado');
        return null;
        }
    }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());
//A través de este console.log se demuestra el retorno de un arreglo vacío.

productManager.addProduct("producto prueba 1", "Este es un producto prueba", 100, "Sin imagen", "abc101", 25);
productManager.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'Sin imagen', 'abc102', 25);
//En lugar de agregar un producto, se agregaron dos para chequear que el id se genere automaticamente.

productManager.getProducts();
//Compración de que ambos productos hayan sido agregados correctamente.

productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc101', 25);
//Se vuelve a agregar un producto con el mismo code para comprobar que de error.

productManager.getProductById(3);
productManager.getProductById(2);
//Se buscan por id dos productos. El id 3 al no existir, debe dar un error de no encontrado.
//El producto id 2 debe ser encontrado y mostrado en consola.