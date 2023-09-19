import { messageModel } from '../db/models/messages.model.js';

class ChatManager {

    async getChats() {
        const chats = await messageModel.find();
        
        if (chats.length < 1) {
            return [];
        }else{
            try {
            return chats;
            } catch (err) {
            console.error('Error al leer el archivo de productos:', err);
            return [];
            }}
        }
}

    export default ChatManager;