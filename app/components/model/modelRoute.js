const { Router } = require('express');
const controller = require('./modelController');

const router = new Router();

router.route('/')
    .get(controller.getAllModels);

router.route('/:id')
    .get(controller.getModelById);

router.route('/')
    .post(controller.createModel);

router.route('/:id')
    .put(controller.updateModelById);

module.exports = router;