const express = require('express');
const router = express.Router();
const controller = require('./invoices.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.use(verifyToken);

// Invoices CRUD
router.get('/', controller.getInvoices);
router.get('/:id', controller.getInvoiceById);
router.post('/', controller.createInvoice);
router.put('/:id', controller.updateInvoice);
router.delete('/:id', controller.deleteInvoice);

// Extra
router.get("/:id/payments", controller.getInvoicePayments); // Get all payments for an invoice
router.get("/search", controller.searchInvoices);          // Filter/search invoices
router.get("/export", controller.exportInvoices);          // Export invoices as PDF/CSV

module.exports = router;
