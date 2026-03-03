const SettingsService = require('./settings.service');

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await SettingsService.getSettings(req.user.id);
    res.json({ status: 'OK', data: settings });
  } catch (err) {
    next(err);
  }
};

exports.updateCompanyInfo = async (req, res, next) => {
  try {
    const updated = await SettingsService.updateCompanyInfo(req.user.id, req.body);
    res.json({ status: 'OK', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.updateInvoiceSettings = async (req, res, next) => {
  try {
    const updated = await SettingsService.updateInvoiceSettings(req.user.id, req.body);
    res.json({ status: 'OK', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.updateTaxSettings = async (req, res, next) => {
  try {
    const updated = await SettingsService.updateTaxSettings(req.user.id, req.body);
    res.json({ status: 'OK', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.updateEmailNotifications = async (req, res, next) => {
  try {
    const updated = await SettingsService.updateEmailNotifications(req.user.id, req.body);
    res.json({ status: 'OK', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.updateAppearance = async (req, res, next) => {
  try {
    const updated = await SettingsService.updateAppearance(req.user.id, req.body);
    res.json({ status: 'OK', data: updated });
  } catch (err) {
    next(err);
  }
};
