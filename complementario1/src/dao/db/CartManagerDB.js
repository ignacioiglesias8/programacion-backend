import { cartModel } from '../db/models/carts.model.js';
import { productModel } from '../db/models/products.model.js';

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
        try {
        let cart = await cartModel.find({_id:cartId});
        if (!cart) {
            console.error("Carrito no encontrado");
            return;
        }
        
        let product = await productModel.find({_id:productId})
        cart.products.push({product});

        await cartModel.updateOne({_id:cartId}, cart);
    
        } catch (err) {
            console.error("Error al guardar los carritos en el archivo:", err);
        }
    }
}

    export default CartManager;