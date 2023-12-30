export default class CartRepository {
    constructor (dao){
        this.dao = dao;
    }

    addCart = async (data) => {
        let result = await this.dao.createCartDB(data);
        return result
    }

    popCartById = async (_id) => {
        let result = await this.dao.populateCart(_id);
        return result
    }

    findCartById = async (_id) => {
        let result = await this.dao.findCart(_id);
        return result
    }

    addExistingProduct = async (cartId, product, existingProduct) => {
        let result = await this.dao.updateExistingProduct(cartId, product, existingProduct);
        return result
    }

    addNewProduct = async (cartId, product, quantity) => {
        let result = await this.dao.updateNewProduct(cartId, product, quantity);
        return result
    }

    handleAddProductToCart = async (product, cart, cartId, quantity) => {
        const existingProduct = cart.products.find(item => 
            item.product.toString() === product[0]._id.toString());

        if (existingProduct) {
            const result = await this.dao.updateExistingProduct(cartId, product, 
                existingProduct);
            return result
        } else {
            const result = await this.dao.updateNewProduct(cartId, product, quantity);
            return result
        }
    }

    modifyCart = async (cartId, newCart) => {
        let result = await this.dao.updateCart(cartId, newCart);
        return result
    }

    modifyQuantity = async (cartId, productId, newQuantity) => {
        let result = await this.dao.updateQuantity(cartId, productId, newQuantity);
        return result
    }

    deleteOneProduct = async (cartId, productId) => {
        let result = await this.dao.removeOneProduct(cartId, productId);
        return result
    }

    deleteAllProducts = async (cartId) => {
        let result = await this.dao.removeAllProducts(cartId);
        return result
    }

    deleteOneCart = async (_id) => {
        let result = await this.dao.deleteCartById(_id);
        return result
    }
}