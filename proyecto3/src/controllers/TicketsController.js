import {ticketsService, productsService, cartsService} from '../repository/index.js';

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

        for (const cartItem of cart.products) {
            const productId = cartItem.product;
            const productQuantity = cartItem.quantity;
            const product = await productsService.getById(productId);
            const productStock = product[0].stock;
    
            if (productStock < productQuantity) {
                console.error(`Cantidad insuficiente de producto ${product[0].name}`);
                break;
            } 

            const quantityUpdated = productStock - productQuantity;
            const modifications = { stock: quantityUpdated };
            await productsService.updateById(productId, modifications);

            ticketDataArray.push({
                amount: product[0].price * productQuantity,
            });
        }

        if (ticketDataArray.length > 0){
            const ticketData = {
                code: await ticketsService.generateUniqueTicketCode(),
                amount: ticketDataArray.reduce((total, productData) => total + productData.amount, 0),
                purchaser: email,
            };
    
            await ticketsService.saveTicket(ticketData);
        }else{
            console.error(`No hay productos para facturar`);
        }
    }
}

    export default TicketController;