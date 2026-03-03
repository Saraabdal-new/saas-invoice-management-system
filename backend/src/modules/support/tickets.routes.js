const express = require("express");
const router = express.Router();
const ticketsController = require("./tickets.controller");
const RepliesController = require("./replies.service");
const { verifyToken } = require("../../middlewares/auth.middleware");
router.use(verifyToken);

// Protect all support routes
router.use(verifyToken);


// Tickets CRUD
router.get("/", ticketsController.getTickets);
router.get("/:id", ticketsController.getTicketById);
router.post("/", ticketsController.createTicket);
router.put("/:id", ticketsController.updateTicket);

// Ticket Replies
router.post("/:ticketId/replies", ticketsController.addReply);
router.get("/:ticketId/replies", ticketsController.getReplies);

module.exports = router;
