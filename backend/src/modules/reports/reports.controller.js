const reportsService = require('./reports.service');

exports.getReports = async (req, res, next) => {
    try {
        const reports = await reportsService.getReports(req.user.id);
        res.json({ status: 'OK', data: reports });
    } catch (err) { next(err); }
};

exports.createReport = async (req, res, next) => {
    try {
        const report = await reportsService.createReport(req.user.id, req.body);
        res.json({ status: 'OK', data: report });
    } catch (err) { next(err); }
};

exports.getReportById = async (req, res, next) => {
    try {
        const report = await reportsService.getReportById(req.params.id);
        res.json({ status: 'OK', data: report });
    } catch (err) { next(err); }
};
