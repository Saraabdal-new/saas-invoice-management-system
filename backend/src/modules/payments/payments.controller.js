const service = require('./payments.service');

exports.list = async (req, res, next) => {
  try {
    res.json({ status: 'OK', data: await service.list(req.user.id) });
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    res.json({ status: 'OK', data: await service.getById(req.user.id, req.params.id) });
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    res.json({ status: 'OK', data: await service.create(req.user.id, req.body) });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    res.json({ status: 'OK', data: await service.update(req.user.id, req.params.id, req.body) });
  } catch (e) { next(e); }
};

exports.softDelete = async (req, res, next) => {
  try {
    await service.softDelete(req.user.id, req.params.id);
    res.json({ status: 'OK', message: 'Payment deleted' });
  } catch (e) { next(e); }
};
