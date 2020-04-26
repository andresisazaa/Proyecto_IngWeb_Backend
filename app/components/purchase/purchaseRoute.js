const { Router } = require('express');
const controller = require('./purchaseController');

const router = new Router();

router.route('/')
    .get(controller.getAllPurchases);

router.route('/:id')
    .get(controller.getPurchaseById);

router.route('/')
    .post(controller.createPurchase);

module.exports = router;