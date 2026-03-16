const db = require("../../config/db");

/**
 * Add reply to a support ticket
 */
exports.addReply = async (ticketId, userId, data) => {
  if (!data.message) {
    throw new Error("Reply message is required");
  }

  const query = `
        INSERT INTO support_replies (
            support_tickets_id,
            users_id,
            message
        )
        VALUES ($1, $2, $3)
        RETURNING *
    `;

  const values = [ticketId, userId, data.message];
  const result = await db.query(query, values);

  return result.rows[0];
};

/**
 * Get all replies for a ticket
 */
exports.getReplies = async (ticketId) => {
  const query = `
        SELECT
            sr.id,
            sr.message,
            sr.created_at,
            u.id AS user_id,
            u.name AS user_name
        FROM support_replies sr
        JOIN users u ON u.id = sr.users_id
        WHERE sr.support_tickets_id = $1
        ORDER BY sr.created_at ASC
    `;

  const result = await db.query(query, [ticketId]);
  return result.rows;
};
