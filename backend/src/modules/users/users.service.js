const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

// Get user by ID
exports.getUserById = async (id) => {
  const { rows } = await db.query(
    `SELECT id, name, email, role, phone, company_name, created_at 
     FROM users WHERE id=$1 AND deleted_at IS NULL`,
    [id]
  );
  return rows[0] || null;
};

// Get all users (admin only, assuming called with checks)
exports.getAllUsers = async () => {
  const { rows } = await db.query(
    `SELECT id, name, email, role, created_at 
     FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC`
  );
  return rows;
};

// Update user
exports.updateUser = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name) {
    fields.push(`name=$${idx}`);
    values.push(data.name);
    idx++;
  }
  if (data.email) {
    fields.push(`email=$${idx}`);
    values.push(data.email);
    idx++;
  }
  if (data.phone) {
    fields.push(`phone=$${idx}`);
    values.push(data.phone);
    idx++;
  }
  if (data.company_name) {
    fields.push(`company_name=$${idx}`);
    values.push(data.company_name);
    idx++;
  }
  if (data.role) {
    fields.push(`role=$${idx}`);
    values.push(data.role);
    idx++;
  }

  if (fields.length === 0) throw new Error("No fields to update");

  values.push(id);
  const query = `UPDATE users SET ${fields.join(
    ", "
  )}, updated_at=NOW() WHERE id=$${idx} AND deleted_at IS NULL RETURNING *`;

  const { rows } = await db.query(query, values);
  if (rows.length === 0) throw new Error("User not found");
  return rows[0];
};

// Update password
exports.updatePassword = async (id, { currentPassword, newPassword }) => {
  const { rows } = await db.query(
    `SELECT password FROM users WHERE id=$1 AND deleted_at IS NULL`,
    [id]
  );
  const user = rows[0];
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error("Invalid current password");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.query(`UPDATE users SET password=$1, updated_at=NOW() WHERE id=$2`, [
    hashedPassword,
    id,
  ]);
};

// Delete user (soft delete)
exports.deleteUser = async (id) => {
  const { rowCount } = await db.query(
    `UPDATE users SET deleted_at=NOW() WHERE id=$1 AND deleted_at IS NULL`,
    [id]
  );
  if (rowCount === 0) throw new Error("User not found");
  return true;
};
