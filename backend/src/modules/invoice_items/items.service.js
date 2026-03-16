const createError = require("http-errors");
const db = require("../../config/db");

/**
 * Get all items for an invoice
 */
exports.getItemsByInvoice = async (invoiceId) => {
  const result = await db.query(
    `SELECT * FROM invoice_items WHERE invoices_id=$1 AND deleted_at IS NULL`,
    [invoiceId]
  );
  return result.rows;
};

/**
 * Create a new invoice item
 */
exports.createItem = async (data) => {
  const result = await db.query(
    `INSERT INTO invoice_items (invoices_id, description, quantity, unit_price, tax_rate)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      data.invoices_id,
      data.description,
      data.quantity,
      data.unit_price,
      data.tax_rate || 0,
    ]
  );
  return result.rows[0];
};

/**
 * Update an existing invoice item
 */
exports.updateItem = async (itemId, userId, data) => {
  // Step 1: Fetch item and verify ownership
  const { rows: existingRows } = await db.query(
    `SELECT ii.*, i.users_id
         FROM invoice_items ii
         JOIN invoices i ON ii.invoices_id = i.id
         WHERE ii.id = $1 AND ii.deleted_at IS NULL`,
    [itemId]
  );

  const item = existingRows[0];

  if (!item) throw createError(404, "Invoice item not found");
  if (item.users_id !== userId) throw createError(403, "Access denied");

  // Step 2: Build dynamic update query
  const allowedFields = ["description", "quantity", "unit_price", "tax_rate"];
  const fields = [];
  const values = [];
  let idx = 1;

  for (const field of allowedFields) {
    if (field in data) {
      fields.push(`${field}=$${idx}`);
      values.push(data[field]);
      idx++;
    }
  }

  if (fields.length === 0) return item; // Nothing to update

  values.push(itemId); // For WHERE clause

  const query = `
        UPDATE invoice_items
        SET ${fields.join(", ")}, updated_at=NOW()
        WHERE id=$${idx}
        RETURNING *
    `;

  const { rows } = await db.query(query, values);

  if (!rows[0]) throw createError(404, "Invoice item not found");

  return rows[0];
};

/**
 * Soft delete an invoice item
 */
exports.deleteItem = async (itemId, userId) => {
  // Verify ownership first
  const { rows } = await db.query(
    `SELECT ii.*, i.users_id
         FROM invoice_items ii
         JOIN invoices i ON ii.invoices_id = i.id
         WHERE ii.id = $1 AND ii.deleted_at IS NULL`,
    [itemId]
  );

  const item = rows[0];
  if (!item) throw createError(404, "Invoice item not found");
  if (item.users_id !== userId) throw createError(403, "Access denied");

  await db.query(`UPDATE invoice_items SET deleted_at=NOW() WHERE id=$1`, [
    itemId,
  ]);

  return true;
};
