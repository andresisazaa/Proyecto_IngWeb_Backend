const { Router } = require('express');
const controller = require('./customerController');

const router = new Router();

router.route('/')
    .get(controller.getAllCustomers);

router.route('/:id')
    .get(controller.getCustomerById);

router.route('/')
    .post(controller.createCustomer);

router.route('/:id')
    .put(controller.updateCustomerById);

module.exports = router;