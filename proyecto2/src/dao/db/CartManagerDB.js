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
        const cart = await cartModel.find({_id:cartId});
        if (!cart) {
            console.error("Carrito no encontrado");
            return;
        }

        const product = await productModel.find({_id:productId});
        const productToAdd = product[0]._id.toString();

        const existingProduct = cart[0].products.find(item => item.product.toString() === productToAdd);

        if (existingProduct) {
            await cartModel.updateOne(
                { _id: cartId, 'products.product': productToAdd },
                { $set: { 'products.$.quantity': existingProduct.quantity + 1 } }
            );
        } else {
            await cartModel.updateOne(
                { _id: cartId },
                { $push: { products: { product: productToAdd, quantity: quantity}} });
            }
        
        } catch (err) {
            console.error("Error al guardar los carritos en el archivo:", err);
        }
    }

    async deleteProductFromCart(cartId, productId){
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { error: 'Carrito no encontrado' };
            }
            
            const productToRemove = cart.products.find(item => item.product.toString() === productId);
            if (!productToRemove) {
                return { error: 'Producto no encontrado en el carrito' };
            }
    
            await cartModel.updateOne(
                { _id: cartId },
                { $pull: { products: { product: productId } } }
            );
    
            return { message: 'Producto eliminado del carrito correctamente' };
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { error: 'Carrito no encontrado' };
            }
    
            if (cart.products.length === 0) {
                return { error: 'El carrito ya esta vacío' };
            }

            await cartModel.updateOne(
                { _id: cartId },
                { $set: { products: [] } }
            );
    
            return { message: 'Todos los productos han sido eliminados del carrito correctamente' };
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error);
        }
    }
}

    export default CartManager;