const authService = require('./auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ status: 'OK', data: user });
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);
        res.json({ status: 'OK', token });
    } catch (err) { next(err); }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = await authService.refreshToken(req.body.refreshToken);
        res.json({ status: 'OK', token });
    } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
    try { await authService.forgotPassword(req.body.email); res.json({ status: 'OK', message: 'Email sent' }); }
    catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
    try { await authService.resetPassword(req.params.token, req.body.password); res.json({ status: 'OK', message: 'Password updated' }); }
    catch (err) { next(err); }
};

exports.getProfile = async (req, res, next) => {
    try { res.json({ status: 'OK', data: req.user }); }
    catch (err) { next(err); }
};
