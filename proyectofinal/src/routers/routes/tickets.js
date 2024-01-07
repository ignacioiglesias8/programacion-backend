import { Router } from 'express';
import { authorization } from '../../functions/auth.js';
import TicketController from '../../controllers/TicketsController.js';

const router = Router();

const ticketController = new TicketController();

router.get('/:tid', authorization(['admin']), async (req, res) => {
    const ticket = await ticketController.getTicketById(req.params.tid);
    if (!ticket) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    
    res.send({ticket});
});

export default router;