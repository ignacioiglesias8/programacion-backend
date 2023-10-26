import Chats from '../dao/mongo/messages.mongo.js';

const chatsService = new Chats();

class ChatController {

    async getChats() {
        const chats = await chatsService.getChats();
        
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

    async saveChat(data){
        const chats = await chatsService.saveChat(data);

        return chats;
    }
}

    export default ChatController;