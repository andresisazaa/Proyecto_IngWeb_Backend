const { Router } = require('express');
const controller = require('./saleController');

const router = new Router();

router.route('/:id')
    .get(controller.getSaleById);

router.route('/')
    .get(controller.getAllSales);

router.route('/')
    .post(controller.createSale);

module.exports = router;