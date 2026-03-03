const usersService = require('./users.service');

// Get current user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update profile info
exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await usersService.updateUser(
      req.user.id,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Update password
exports.updatePassword = async (req, res, next) => {
  try {
    await usersService.updatePassword(req.user.id, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Admin: get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Admin: get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Admin: update user
exports.updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(
      req.params.id,
      req.body
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Admin: delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
