import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const name = req.query.name ?? "Usuario";
    res.render(
        'index',
        {
            title: "Nacho",
            name: name
        }
    );
});

export default router;
