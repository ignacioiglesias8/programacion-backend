import { messageModel } from '../models/messages.model.js';

export default class Message {
    get = async () => {
        let result = await messageModel.find();
        return result;
    }
}