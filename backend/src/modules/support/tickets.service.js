const db = require("../../config/db");

/**
 * Get all tickets for a user
 */
exports.getTickets = async (userId) => {
  const query = `
        SELECT *
        FROM support_tickets
        WHERE users_id = $1
        ORDER BY created_at DESC
    `;

  const result = await db.query(query, [userId]);
  return result.rows;
};

/**
 * Get ticket by ID (secured by user)
 */
exports.getTicketById = async (ticketId, userId) => {
  const query = `
        SELECT *
        FROM support_tickets
        WHERE id = $1 AND users_id = $2
    `;

  const result = await db.query(query, [ticketId, userId]);
  return result.rows[0];
};

/**
 * Create support ticket
 */
exports.createTicket = async (userId, data) => {
  if (!data.subject || !data.message) {
    throw new Error("Subject and message are required");
  }

  const query = `
        INSERT INTO support_tickets (
            users_id,
            subject,
            message,
            status
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

  const values = [userId, data.subject, data.message, data.status || "open"];

  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Update ticket
 */
exports.updateTicket = async (ticketId, userId, data) => {
  const query = `
        UPDATE support_tickets
        SET
            subject = COALESCE($1, subject),
            status = COALESCE($2, status),
            updated_at = NOW()
        WHERE id = $3 AND users_id = $4
        RETURNING *
    `;

  const values = [data.subject, data.status, ticketId, userId];

  const result = await db.query(query, values);
  return result.rows[0];
};
