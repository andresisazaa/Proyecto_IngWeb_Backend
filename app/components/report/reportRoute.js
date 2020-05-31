const { Router } = require('express');
const controller = require('./reportController');

const router = new Router();

router.route('/sales/file')
    .get(controller.getMonthlySalesReportFile);

router.route('/sales/pos')
    .get(controller.getMonthlySalesReportByPos);

router.route('/purchases/pos')
    .get(controller.getMonthlyPurchasesReportByPos);

module.exports = router;