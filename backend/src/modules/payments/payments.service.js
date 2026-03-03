const db = require('../../config/db');
const { sequelize } = require('../../config/db');

exports.list = async (userId) => {
  const { rows } = await db.query(`
    SELECT p.*, i.invoice_number
    FROM payments p
    JOIN invoices i ON i.id = p.invoices_id
    WHERE i.users_id = $1 AND p.deleted_at IS NULL
    ORDER BY p.payment_date DESC
  `, [userId]);
  return rows;
};

exports.getById = async (userId, id) => {
  const { rows } = await db.query(`
    SELECT p.*
    FROM payments p
    JOIN invoices i ON i.id = p.invoices_id
    WHERE p.id=$1 AND i.users_id=$2
  `, [id, userId]);
  return rows[0];
};

exports.create = async (userId, data) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const invoice = await client.query(
      `SELECT * FROM invoices WHERE id=$1 AND users_id=$2 FOR UPDATE`,
      [data.invoices_id, userId]
    );

    if (!invoice.rows.length) throw new Error('Invoice not found');

    const payment = await client.query(`
      INSERT INTO payments (invoices_id, payment_date, amount_paid, payment_method, reference)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `, [
      data.invoices_id,
      data.payment_date,
      data.amount_paid,
      data.payment_method,
      data.reference || null
    ]);

    const remaining = invoice.rows[0].remaining_balance - data.amount_paid;
    const status = remaining <= 0 ? 'paid' : invoice.rows[0].status;

    await client.query(`
      UPDATE invoices
      SET remaining_balance=$1, status=$2
      WHERE id=$3
    `, [Math.max(0, remaining), status, data.invoices_id]);

    await client.query('COMMIT');
    return payment.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

exports.update = async (userId, id, data) => {
  const { rows } = await db.query(`
    UPDATE payments p
    SET payment_date=$1, amount_paid=$2, payment_method=$3, reference=$4
    FROM invoices i
    WHERE p.id=$5 AND i.id=p.invoices_id AND i.users_id=$6
    RETURNING p.*
  `, [
    data.payment_date,
    data.amount_paid,
    data.payment_method,
    data.reference,
    id,
    userId
  ]);
  return rows[0];
};

exports.softDelete = async (userId, id) => {
  await db.query(`
    UPDATE payments p
    SET deleted_at=NOW()
    FROM invoices i
    WHERE p.id=$1 AND i.id=p.invoices_id AND i.users_id=$2
  `, [id, userId]);
};
