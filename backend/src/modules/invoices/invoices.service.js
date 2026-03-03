const createError = require('http-errors');
const db = require('../../config/db'); 
const { sequelize } = require('../../config/db');

// your database module
/**
 * Get all invoices for a user
 */
exports.getInvoices = async (userId) => {
  return await sequelize.query(
    'SELECT * FROM invoices WHERE users_id = :userId',
    { replacements: { userId }, type: QueryTypes.SELECT }
  );
  // Example: return prisma.invoice.findMany({ where: { userId } });
  return [];
};

/**
 * Get single invoice by ID
 */
exports.getInvoiceById = async (invoiceId, userId) => {
  const invoice = null; // fetch from DB

  if (!invoice) {
    throw createError(404, 'Invoice not found');
  }

  if (invoice.userId !== userId) {
    throw createError(403, 'Access denied');
  }

  return invoice;
};

/**
 * Create invoice
 */
exports.createInvoice = async (userId, data) => {
  const invoice = {
    ...data,
    userId,
    status: data.status || 'draft',
    createdAt: new Date()
  };

  // insert into DB
  return invoice;
};

/**
 * Update invoice
 * @param {number} invoiceId - ID of the invoice to update
 * @param {string} userId - ID of the user performing the update
 * @param {object} data - Fields to update
 * @returns {object} - Updated invoice
 */
exports.updateInvoice = async (invoiceId, userId, data) => {
    // Step 1: Fetch the invoice first
    const { rows: existingRows } = await db.query(
      'SELECT * FROM invoices WHERE id=$1',
      [invoiceId]
    );
  
    const invoice = existingRows[0];
  
    if (!invoice) {
      throw createError(404, 'Invoice not found');
    }
  
    if (invoice.users_id !== userId) {
      throw createError(403, 'Access denied');
    }
  
    // Step 2: Build dynamic update query
    const allowedFields = [
      'clients_id',
      'invoice_number',
      'invoice_date',
      'due_date',
      'total_amount',
      'remaining_balance',
      'status',
      'currency'
    ];
  
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
  
    if (fields.length === 0) {
      // Nothing to update
      return invoice;
    }
  
    // Add invoiceId and userId for WHERE clause
    values.push(invoiceId, userId);
  
    const query = `
      UPDATE invoices
      SET ${fields.join(', ')}, updated_at=NOW()
      WHERE id=$${idx} AND users_id=$${idx + 1}
      RETURNING *
    `;
  
    const { rows } = await db.query(query, values);
  
    if (!rows[0]) {
      throw createError(404, 'Invoice not found or access denied');
    }
  
    return rows[0];
  };
/**
* Soft delete invoice
 * @param {number} invoiceId - ID of the invoice to delete
 * @param {string} userId - ID of the user performing the deletion
 * @returns {boolean} - true if deleted
 */
exports.deleteInvoice = async (invoiceId, userId) => {
    // Step 1: Fetch invoice to verify existence and ownership
    const { rows: existingRows } = await db.query(
      'SELECT * FROM invoices WHERE id=$1',
      [invoiceId]
    );
  
    const invoice = existingRows[0];
  
    if (!invoice) {
      throw createError(404, 'Invoice not found');
    }
  
    if (invoice.users_id !== userId) {
      throw createError(403, 'Access denied');
    }
  // Step 2: Soft delete in DB
  await db.query(
    'UPDATE invoices SET deleted_at=NOW() WHERE id=$1 AND users_id=$2',
    [invoiceId, userId]
  );

  return true;
};

/**
 * Get payments for an invoice
 */
exports.getInvoicePayments = async (invoiceId, userId) => {
  const invoice = null; // fetch invoice

  if (!invoice) {
    throw createError(404, 'Invoice not found');
  }

  if (invoice.userId !== userId) {
    throw createError(403, 'Access denied');
  }

  // fetch payments
  return [];
};

/**
 * Search invoices
 */
exports.searchInvoices = async (userId, filters) => {
  const {
    status,
    clientId,
    fromDate,
    toDate,
    minAmount,
    maxAmount
  } = filters;

  // build query dynamically
  return [];
};

/**
 * Export invoices (PDF / CSV)
 */
exports.exportInvoices = async (userId, format = 'pdf') => {
  if (!['pdf', 'csv'].includes(format)) {
    throw createError(400, 'Invalid export format');
  }

  // generate file
  return {
    format,
    url: `/exports/invoices_${userId}.${format}`
  };
};
