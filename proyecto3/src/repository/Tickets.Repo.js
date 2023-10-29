export default class TicketRepository {
    constructor (dao){
        this.dao = dao;
    }

    getTicketOneId = async (_id) => {
        let result = await this.dao.getTicket(_id);
        return result
    }

    saveTicket = async (data) => {
        let result = await this.dao.createTicket(data);
        return result
    }
    
    generateUniqueTicketCode = async () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uniqueCode = '';
    
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueCode += characters.charAt(randomIndex);
        }
    
        return uniqueCode;
    }
}