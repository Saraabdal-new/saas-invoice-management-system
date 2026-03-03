const router = require('express').Router();
const service = require('./notifications.service');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/', verifyToken, async (req, res, next) => {
  try {
    res.json({ status: 'OK', data: await service.list(req.user.id) });
  } catch (e) { next(e); }
});

router.put('/:id/read', verifyToken, async (req, res, next) => {
  try {
    await service.markRead(req.user.id, req.params.id);
    res.json({ status: 'OK' });
  } catch (e) { next(e); }
});

module.exports = router;
