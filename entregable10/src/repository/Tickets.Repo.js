import {generateUniqueTicketCode} from '../functions/ticketCode.js'

export default class TicketRepository {
    constructor (dao){
        this.dao = dao;
    }

    getTicketOneId = async (_id) => {
        let result = await this.dao.getTicket(_id);
        return result
    }
    
    saveTicket = async (ticketDataArray, email) => {
        const code = generateUniqueTicketCode();
        
        let data = {
            code: code,
            amount: ticketDataArray.reduce((total, productData) => total + productData.amount, 0),
            purchaser: email,
        };
        let ticketData = await this.dao.createTicket(data)
        return ticketData;
    }
}