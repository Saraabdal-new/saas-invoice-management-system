const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../../config/db');

// Get user by ID
exports.getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      company_name: true,
      created_at: true
    }
  });
};

// Get all users
exports.getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true
    }
  });
};

// Update user
exports.updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data
  });
};

// Update password
exports.updatePassword = async (id, { currentPassword, newPassword }) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error('Invalid current password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword }
  });
};

// Delete user
exports.deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id }
  });
};
