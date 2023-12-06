import { messageModel } from '../models/messages.model.js';

export default class Message {
    getAllMessages = async () => {
        let result = await messageModel.find();
        return result;
    }

    createChat = async (data) => {
        let result = await messageModel.create(data);
        return result;
    }
}