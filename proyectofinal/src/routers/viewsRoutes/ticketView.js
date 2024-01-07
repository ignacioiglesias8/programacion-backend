import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import TicketController from '../../controllers/TicketsController.js';

const router = Router();

const userController = new UserController();
const ticketsController = new TicketController();

router.get('/ticket', async (req, res) => {
    const user = await userController.getUserByEmail(req.session.user.email);
    const ticketId = user[0].ticket[0].ticketInfo;
    const ticket = await ticketsController.getTicketById(ticketId)

    const response = {
        code : ticket[0].code,
        purchase_datetime: ticket[0].purchase_datetime,
        amount: ticket[0].amount,
        user: ticket[0].purchaser,
    };

    res.render(
        'ticket',
        {
            ticket: response,
            style: "chat.css",
        }
    );
});

router.put('/tickets/finish', async (req, res) => {
    const user = await userController.getUserByEmail(req.session.user.email);
    const userId = user[0]._id;
    await ticketsController.deleteTicketFromUser(userId)

    res.send();
})

export default router;