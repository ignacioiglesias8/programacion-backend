import { Router } from 'express';
import ChatController from '../../controllers/ChatController.js';

const router = Router();

const chatController = new ChatController();

router.get('/', async (req, res) => {
    const chats = await chatController.getChats();

    res.send(chats)
})

export default router;