const express = require('express');
const router = express.Router();

const {
  getProfile,
  updateProfile,
  updatePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('./users.controller');

const { verifyToken, isAdmin } = require('../../middlewares/auth.middleware');

// 🔐 All routes require authentication
router.use(verifyToken);

// 👤 User self-management
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.put('/me/password', updatePassword);

// 🛡️ Admin-only routes
router.get('/', isAdmin, getAllUsers);
router.get('/:id', isAdmin, getUserById);
router.put('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
