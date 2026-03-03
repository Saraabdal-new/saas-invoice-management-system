const express = require('express');
const router = express.Router();
const reportsController = require('./reports.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.use(verifyToken);


router.get('/', verifyToken, reportsController.getReports);
router.post('/', verifyToken, reportsController.createReport);
router.get('/:id', verifyToken, reportsController.getReportById);

module.exports = router;
