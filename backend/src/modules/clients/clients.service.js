const db = require('../../config/db');
const { sequelize } = require('../../config/db');

// Get all clients for user
exports.getClients = async (userId) => {
  const { rows } = await db.query(
    `SELECT *
     FROM clients
     WHERE users_id = $1
       AND deleted_at IS NULL
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};

// Get client by ID (ownership protected)
exports.getClientById = async (id, userId) => {
  const { rows } = await db.query(
    `SELECT *
     FROM clients
     WHERE id = $1
       AND users_id = $2
       AND deleted_at IS NULL`,
    [id, userId]
  );

  return rows[0];
};

// Create client
exports.createClient = async (userId, data) => {
  const {
    name,
    company_name,
    email,
    phone,
    address,
    status = 'active',
    notes = '',
    tags = ''
  } = data;

  const { rows } = await db.query(
    `INSERT INTO clients
     (users_id, name, company_name, email, phone, address, status, notes, tags)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [userId, name, company_name, email, phone, address, status, notes, tags]
  );

  return rows[0];
};

// Update client (ownership protected)
exports.updateClient = async (id, userId, data) => {
  const {
    name,
    company_name,
    email,
    phone,
    address,
    status,
    notes,
    tags
  } = data;

  const { rows } = await db.query(
    `UPDATE clients
     SET name=$1,
         company_name=$2,
         email=$3,
         phone=$4,
         address=$5,
         status=$6,
         notes=$7,
         tags=$8,
         updated_at = NOW()
     WHERE id=$9
       AND users_id=$10
       AND deleted_at IS NULL
     RETURNING *`,
    [
      name,
      company_name,
      email,
      phone,
      address,
      status,
      notes,
      tags,
      id,
      userId
    ]
  );

  return rows[0];
};

// Soft delete client (ownership protected)
exports.deleteClient = async (id, userId) => {
  const { rowCount } = await db.query(
    `UPDATE clients
     SET deleted_at = NOW()
     WHERE id = $1
       AND users_id = $2
       AND deleted_at IS NULL`,
    [id, userId]
  );

  return rowCount > 0;
};
