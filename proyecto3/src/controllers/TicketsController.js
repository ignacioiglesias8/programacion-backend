import {ticketsService, productsService, cartsService, usersService} from '../repository/index.js';

class TicketController {

    async getTicketById(_id) {
        try{
            const ticket = await ticketsService.getTicketOneId({_id})

            if (ticket) {
                return ticket;
            } else {
                console.error('Producto no encontrado');
                return null;
            }
        } catch (err) {
            console.error('Error al leer el archivo de tickets:', err);
            return null;
        }        
    }

    async generateTicket(_id, email){
        const cart = await cartsService.findCartById(_id);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const ticketDataArray = [];
        const productsAvailable = [];
        const productsNotAvailable = [];

        for (const cartItem of cart.products) {
            const productId = cartItem.product;
            const productQuantity = cartItem.quantity;
            const product = await productsService.getById(productId);
            const productStock = product[0].stock;
    
            if (productStock < productQuantity) {
                console.error(`Cantidad insuficiente de producto ${product[0].name}`);
                productsNotAvailable.push(productId);
                continue;
            } 

            const quantityUpdated = productStock - productQuantity;
            const modifications = { stock: quantityUpdated };
            await productsService.updateById(productId, modifications);

            productsAvailable.push({
                productId,
                quantity: productQuantity,
            });

            ticketDataArray.push({
                amount: product[0].price * productQuantity,
            });
        }

        if (productsAvailable.length > 0){
            const ticketData = {
                code: await ticketsService.generateUniqueTicketCode(),
                amount: ticketDataArray.reduce((total, productData) => total + productData.amount, 0),
                purchaser: email,
            };
    
            const ticket = await ticketsService.saveTicket(ticketData);
            const user = await usersService.getUser({email: email});
            console.log(user);
            await usersService.addTicketToUser(user[0]._id, ticket._id);
            for (const product of productsAvailable) {
                await cartsService.deleteOneProduct(cart, product.productId);
            }
        }else{
            console.error(`No hay productos para facturar`);
        }
    }
}

    export default TicketController;