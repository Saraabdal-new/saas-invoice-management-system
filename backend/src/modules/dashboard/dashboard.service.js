const db = require('../../config/db');
const { sequelize } = require('../../config/db');

exports.getSummary = async (userId) => {
  const [{ rows: revenue }] = await Promise.all([
    db.query(`SELECT COALESCE(SUM(amount_paid),0) total FROM payments p
              JOIN invoices i ON p.invoices_id=i.id
              WHERE i.users_id=$1`, [userId])
  ]);

  const invoices = await db.query(
    `SELECT COUNT(*) total,
            COUNT(*) FILTER (WHERE status='pending') pending
     FROM invoices WHERE users_id=$1 AND deleted_at IS NULL`,
    [userId]
  );

  const clients = await db.query(
    `SELECT COUNT(*) total FROM clients
     WHERE users_id=$1 AND status='active' AND deleted_at IS NULL`,
    [userId]
  );

  return {
    totalRevenue: revenue[0].total,
    totalInvoices: invoices.rows[0].total,
    activeClients: clients.rows[0].total,
    pendingInvoices: invoices.rows[0].pending
  };
};

exports.getRevenueOverview = async (userId) => {
  const { rows } = await db.query(
    `SELECT TO_CHAR(invoice_date,'Mon') month,
            SUM(total_amount) revenue
     FROM invoices
     WHERE users_id=$1
     GROUP BY month
     ORDER BY MIN(invoice_date) DESC
     LIMIT 6`,
    [userId]
  );
  return rows;
};

exports.getRecentInvoices = async (userId) => {
  const { rows } = await db.query(
    `SELECT invoice_number, total_amount, status, invoice_date
     FROM invoices
     WHERE users_id=$1 AND deleted_at IS NULL
     ORDER BY invoice_date DESC
     LIMIT 5`,
    [userId]
  );
  return rows;
};

exports.getPendingActions = async (userId) => {
  const { rows } = await db.query(
    `SELECT COUNT(*) overdue
     FROM invoices
     WHERE users_id=$1 AND status='overdue'`,
    [userId]
  );
  return rows[0];
};
