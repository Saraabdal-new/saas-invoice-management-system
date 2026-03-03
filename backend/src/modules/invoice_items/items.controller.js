const itemsService = require('./items.service');

/**
 * GET /items/:invoiceId
 */
exports.getItemsByInvoice = async (req, res, next) => {
    try {
        const items = await itemsService.getItemsByInvoice(req.params.invoiceId);
        res.json({ status: 'OK', data: items });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /items
 */
exports.createItem = async (req, res, next) => {
    try {
        const item = await itemsService.createItem(req.body);
        res.json({ status: 'OK', data: item });
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /items/:id
 */
exports.updateItem = async (req, res, next) => {
    try {
        const item = await itemsService.updateItem(req.params.id, req.user.id, req.body);
        res.json({ status: 'OK', data: item });
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /items/:id
 */
exports.deleteItem = async (req, res, next) => {
    try {
        await itemsService.deleteItem(req.params.id, req.user.id);
        res.json({ status: 'OK', message: 'Item deleted' });
    } catch (err) {
        next(err);
    }
};
