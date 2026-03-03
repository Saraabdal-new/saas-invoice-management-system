const express = require('express');
const router = express.Router();
const controller = require('./dashboard.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/summary', controller.getSummary);
router.get('/revenue-overview', controller.getRevenueOverview);
router.get('/recent-invoices', controller.getRecentInvoices);
router.get('/pending-actions', controller.getPendingActions);

module.exports = router;
