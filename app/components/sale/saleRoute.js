const { Router } = require('express');
const controller = require('./saleController');

const router = new Router();

router.route('/report')
    .get(controller.getMonthlySalesReport);

module.exports = router;