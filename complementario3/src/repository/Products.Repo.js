export default class ProductRepository {
    constructor (dao){
        this.dao = dao;
    }

    createProduct = async (title, description, price, thumbnails, code, stock, category, status, 
        owner) => {
        const product = {
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status,
            owner,
        };
        
        let result = await this.dao.createDoc(product);
        return result
    }

    paginateProducts = async (limit, order, category, status, page) => {

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

        const options = {page, limit, lean: true, sort: sortOptions}

        let result = await this.dao.paginateDocs(filters, options);
        return result
    }

    getById = async (_id) => {
        let result = await this.dao.getDocById(_id);
        return result
    }

    updateById = async (_id, product) => {
        try{
            const products = await this.dao.getDocById({_id});
            let productUpdated = {};
        
            for (let key in products) {
                if (products[key].id == _id) {
                    products[key].title = product.title ? product.title : products[key].title;
                    products[key].description = product.description ? product.description : products[key].description;
                    products[key].price = product.price ? product.price : products[key].price;
                    products[key].code = product.code ? product.code : products[key].code;
                    products[key].stock = product.stock ? product.stock : products[key].stock;
                    products[key].category = product.category ? product.category : products[key].category;
                    products[key].thumbnails = product.thumbnails ? product.thumbnails : products[key].thumbnails;
                    if (product.status !== undefined) {
                        products[key].status = typeof product.status === 'string' ? product.status === 'true' : Boolean(product.status);
                    }
        
                    productUpdated = products[key];
                }
            }
                const result = await this.dao.updateDocById({_id}, productUpdated);
                return result;
            } catch (err) {
                console.error('Error al actualizar el producto:', err);
                throw err; 
            }
    }

    deleteById = async (_id) => {
        let result = await this.dao.deleteDocById(_id);
        return result
    }

    processProducts = async (cart) => {
        const ticketDataArray = [];
        const productsAvailable = [];
        const productsNotAvailable = [];

        for (const cartItem of cart.products) {
            const productId = cartItem.product;
            const productQuantity = cartItem.quantity;
            const product = await this.dao.getDocById(productId);
            const productStock = product[0].stock;
    
            if (productStock < productQuantity) {
                console.error(`Cantidad insuficiente de producto ${product[0].title}`);
                productsNotAvailable.push(product[0].title);
                continue;
            } 

            const quantityUpdated = productStock - productQuantity;
            const modifications = { stock: quantityUpdated };
            await this.dao.updateDocById(productId, modifications);

            productsAvailable.push({
                productId,
                quantity: productQuantity,
            });

            ticketDataArray.push({
                amount: product[0].price * productQuantity,
            });
        }

        return { productsAvailable, productsNotAvailable , ticketDataArray};
    }
}