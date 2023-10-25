import Messages from '../dao/mongo/messages.mongo.js';

const messagesService = new Messages();

class ChatManager {

    async getChats() {
        const chats = await messagesService.get();
        
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