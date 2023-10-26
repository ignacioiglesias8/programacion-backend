import { messageModel } from '../models/messages.model.js';

export default class Message {
    getChats = async () => {
        let result = await messageModel.find();
        return result;
    }
}