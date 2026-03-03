const ticketsService = require('./tickets.service');
const repliesService = require('./replies.service');

/**
 * Get all tickets for current user
 */
exports.getTickets = async (req, res, next) => {
    try {
        const tickets = await ticketsService.getTickets(req.user.id);
        res.status(200).json({ status: 'OK', data: tickets });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single ticket by ID
 */
exports.getTicketById = async (req, res, next) => {
    try {
        const ticket = await ticketsService.getTicketById(
            req.params.id,
            req.user.id
        );

        if (!ticket) {
            return res.status(404).json({ status: 'ERROR', message: 'Ticket not found' });
        }

        res.status(200).json({ status: 'OK', data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * Create new support ticket
 */
exports.createTicket = async (req, res, next) => {
    try {
        const ticket = await ticketsService.createTicket(req.user.id, req.body);
        res.status(201).json({ status: 'OK', data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * Update ticket (subject / status)
 */
exports.updateTicket = async (req, res, next) => {
    try {
        const ticket = await ticketsService.updateTicket(
            req.params.id,
            req.user.id,
            req.body
        );

        res.status(200).json({ status: 'OK', data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * Add reply to ticket
 */
exports.addReply = async (req, res, next) => {
    try {
        const reply = await repliesService.addReply(
            req.params.ticketId,
            req.user.id,
            req.body
        );

        res.status(201).json({ status: 'OK', data: reply });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all replies for a ticket
 */
exports.getReplies = async (req, res, next) => {
    try {
        const replies = await repliesService.getReplies(req.params.ticketId);
        res.status(200).json({ status: 'OK', data: replies });
    } catch (error) {
        next(error);
    }
};
