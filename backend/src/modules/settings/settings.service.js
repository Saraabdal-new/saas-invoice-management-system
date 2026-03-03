const db = require("../../config/db");
const { sequelize } = require("../../config/db");

/**
 * Get full settings for user
 */
exports.getSettings = async (userId) => {
  const { rows } = await db.query(
    `SELECT * FROM settings WHERE users_id = $1`,
    [userId]
  );
  return rows[0];
};

/**
 * Company Information
 */
exports.updateCompanyInfo = async (userId, data) => {
  const { rows } = await db.query(
    `
    UPDATE settings
    SET company_name = $1,
        tax_id = $2,
        company_address = $3,
        company_email = $4,
        company_phone = $5,
        website = $6
    WHERE users_id = $7
    RETURNING *
  `,
    [
      data.company_name,
      data.tax_id,
      data.company_address,
      data.company_email,
      data.company_phone,
      data.website,
      userId,
    ]
  );

  return rows[0];
};

/**
 * Invoice Defaults
 */
exports.updateInvoiceSettings = async (userId, data) => {
  const { rows } = await db.query(
    `
    UPDATE settings
    SET invoice_number_prefix = $1,
        next_invoice_number = $2,
        default_payment_terms = $3,
        default_currency = $4,
        default_invoice_notes = $5,
        payment_instructions = $6
    WHERE users_id = $7
    RETURNING *
  `,
    [
      data.invoice_number_prefix,
      data.next_invoice_number,
      data.default_payment_terms,
      data.default_currency,
      data.default_invoice_notes,
      data.payment_instructions,
      userId,
    ]
  );

  return rows[0];
};

/**
 * Tax & Pricing
 */
exports.updateTaxSettings = async (userId, data) => {
  const { rows } = await db.query(
    `
    UPDATE settings
    SET default_tax_rate = $1,
        tax_label = $2
    WHERE users_id = $3
    RETURNING *
  `,
    [data.default_tax_rate, data.tax_label, userId]
  );

  return rows[0];
};

/**
 * Email Notifications
 * Stored as JSONB
 */
exports.updateEmailNotifications = async (userId, data) => {
  const { rows } = await db.query(
    `
    UPDATE settings
    SET email_notifications = $1
    WHERE users_id = $2
    RETURNING *
  `,
    [JSON.stringify(data), userId]
  );

  return rows[0];
};

/**
 * Appearance (theme, language, etc.)
 */
exports.updateAppearance = async (userId, data) => {
  const { rows } = await db.query(
    `
    UPDATE settings
    SET appearance = $1
    WHERE users_id = $2
    RETURNING *
  `,
    [JSON.stringify(data), userId]
  );

  return rows[0];
};
