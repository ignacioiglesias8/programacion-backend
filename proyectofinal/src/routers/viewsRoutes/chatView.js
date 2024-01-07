import { Router } from 'express';
import { authorization } from '../../functions/auth.js';

const router = Router();

router.get('/chat', authorization('user'), async (req, res) => {

    res.render(
        'chat',
        {
            style: "chat.css",
        }
    )
})

export default router;