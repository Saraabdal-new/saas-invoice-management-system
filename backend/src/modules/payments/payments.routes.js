const express = require('express');
const router = express.Router();
const controller = require('./payments.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/', verifyToken, controller.list);
router.get('/:id', verifyToken, controller.getById);
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.softDelete);

module.exports = router;
