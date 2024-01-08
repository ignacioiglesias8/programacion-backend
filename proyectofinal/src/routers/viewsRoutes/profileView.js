import { Router } from 'express';
import UserController from '../../controllers/UserController.js';

const router = Router();

const userController = new UserController();

router.get('/profile', async (req, res) => {
    const userForDocs = await userController.getUserByEmail(req.session.user.email)
    const docs = userForDocs[0].documents.map(doc => doc.toObject({ virtuals: true }));

    res.render(
        'profile',
        {
            style: "index.css",
            user: req.session.user,
            docs: docs
        }
    );
});

export default router;