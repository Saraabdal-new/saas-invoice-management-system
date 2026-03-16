const db = require("../../config/db");

exports.getReports = async (userId) => {
  const result = await db.query(
    `SELECT * FROM report_settings WHERE users_id=$1`,
    [userId]
  );
  return result.rows;
};

exports.createReport = async (userId, data) => {
  const result = await db.query(
    `INSERT INTO report_settings (users_id, name, report_type, filters) VALUES ($1,$2,$3,$4) RETURNING *`,
    [userId, data.name, data.report_type, data.filters || {}]
  );
  return result.rows[0];
};

exports.getReportById = async (id) => {
  const result = await db.query(`SELECT * FROM report_settings WHERE id=$1`, [
    id,
  ]);
  return result.rows[0];
};

exports.dashboardSummary = async (userId) => {
  const { rows } = await db.query(
    `
    SELECT
      SUM(total_amount) AS total_revenue,
      COUNT(*) AS total_invoices,
      COUNT(*) FILTER (WHERE status='paid') AS paid_invoices,
      SUM(remaining_balance) AS outstanding
    FROM invoices
    WHERE users_id=$1 AND deleted_at IS NULL
  `,
    [userId]
  );

  return rows[0];
};

exports.monthlyRevenue = async (userId) => {
  return (
    await db.query(
      `
    SELECT TO_CHAR(invoice_date,'Mon') AS month,
           SUM(total_amount) revenue
    FROM invoices
    WHERE users_id=$1
      AND invoice_date >= NOW() - INTERVAL '6 months'
    GROUP BY month
    ORDER BY MIN(invoice_date)
  `,
      [userId]
    )
  ).rows;
};
