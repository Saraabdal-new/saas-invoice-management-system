const invoicesService = require('./invoices.service');

/**
 * GET /invoices
 */
exports.getInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoices = await invoicesService.getInvoices(userId);
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /invoices/:id
 */
exports.getInvoiceById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoiceId = req.params.id;

    const invoice = await invoicesService.getInvoiceById(invoiceId, userId);
    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /invoices
 */
exports.createInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoiceData = req.body;

    const invoice = await invoicesService.createInvoice(userId, invoiceData);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /invoices/:id
 */
exports.updateInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoiceId = req.params.id;
    const updateData = req.body;

    const invoice = await invoicesService.updateInvoice(
      invoiceId,
      userId,
      updateData
    );

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /invoices/:id
 */
exports.deleteInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoiceId = req.params.id;

    await invoicesService.deleteInvoice(invoiceId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * GET /invoices/:id/payments
 */
exports.getInvoicePayments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoiceId = req.params.id;

    const payments = await invoicesService.getInvoicePayments(
      invoiceId,
      userId
    );

    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /invoices/search
 */
exports.searchInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const filters = req.query;

    const results = await invoicesService.searchInvoices(userId, filters);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /invoices/export
 */
exports.exportInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { format } = req.query; // pdf | csv

    const file = await invoicesService.exportInvoices(userId, format);

    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};
