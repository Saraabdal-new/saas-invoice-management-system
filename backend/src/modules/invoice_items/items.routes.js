const express = require('express');
const router = express.Router();
const controller = require('./items.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');
router.use(verifyToken);

// Invoice items CRUD

router.get('/:invoiceId', controller.getItemsByInvoice);
router.post('/', controller.createItem);
router.put('/:id', controller.updateItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;
