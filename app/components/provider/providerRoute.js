const { Router } = require('express');
const controller = require('./providerController');

const router = new Router();

router.route('/')
    .get(controller.getAllProviders);

router.route('/:id')
    .get(controller.getProviderById);

router.route('/')
    .post(controller.createProvider);

router.route('/:id')
    .put(controller.updateProviderById);

module.exports = router;