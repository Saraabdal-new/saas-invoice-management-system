const service = require('./dashboard.service');

exports.getSummary = async (req, res, next) => {
  try {
    const data = await service.getSummary(req.user.id);
    res.status(200).json({ data });
  } catch (err) { next(err); }
};

exports.getRevenueOverview = async (req, res, next) => {
  try {
    const data = await service.getRevenueOverview(req.user.id);
    res.status(200).json({ data });
  } catch (err) { next(err); }
};

exports.getRecentInvoices = async (req, res, next) => {
  try {
    const data = await service.getRecentInvoices(req.user.id);
    res.status(200).json({ data });
  } catch (err) { next(err); }
};

exports.getPendingActions = async (req, res, next) => {
  try {
    const data = await service.getPendingActions(req.user.id);
    res.status(200).json({ data });
  } catch (err) { next(err); }
};
