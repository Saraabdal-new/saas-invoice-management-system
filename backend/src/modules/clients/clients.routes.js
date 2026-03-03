const express = require('express');
const router = express.Router();

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('./clients.controller');

const { verifyToken } = require('../../middlewares/auth.middleware');

// 🔐 All client routes require authentication
router.use(verifyToken);

// 📋 Clients CRUD
router.get('/', getClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
