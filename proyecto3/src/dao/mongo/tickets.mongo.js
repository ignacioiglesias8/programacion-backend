import { ticketModel } from '../models/tickets.model.js';

export default class Message {
    getTicket = async (_id) => {
        let result = await ticketModel.find(_id);
        return result;
    }

    createTicket = async (data) => {
        let result = await ticketModel.create(data);
        return result;
    }
}