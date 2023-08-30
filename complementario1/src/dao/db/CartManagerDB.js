import { cartModel } from '../db/models/carts.model.js';

class CartManager {

    async createCart() {
        const cart = {
            products: [],
        };
        
        try {
            const createCart = await cartModel.create(cart);
            return createCart;
            } catch (err) {
            console.error("Error al guardar los carritos en el archivo:", err);
            }
    }

    async getCartById(_id) {
        try {
            const cart = await cartModel.find({_id});

            if (cart) {
                return cart;
            } else {
                console.error('Producto no encontrado');
                return null;
            }
        } catch (err) {
            console.error('Error al leer el archivo de productos:', err);
            return null;
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = this.carts.find((cart) => cart.id === cartId);
        if (!cart) {
            console.error("Carrito no encontrado");
        return;
        }

        const existingProduct = cart.products.find(
        (product) => product.product === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            } catch (err) {
            console.error("Error al guardar los carritos en el archivo:", err);
            }
    }
}

    export default CartManager;