import { Router } from 'express';
import ChatManager from '../../dao/db/ChatManagerDB.js';

const router = Router();

const chatManager = new ChatManager();

router.get('/', async (req, res) => {
    const chats = await chatManager.getChats();

    res.send(chats)
})

export default router;