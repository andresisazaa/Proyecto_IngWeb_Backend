const { Router } = require('express');
const controller = require('./machineController');

const router = new Router();

router.route('/')
    .get(controller.getAllMachines);

router.route('/:id')
    .get(controller.getMachineById);

router.route('/')
    .put(controller.updateMachines);

router.route('/:id')
    .put(controller.updateMachineById);

module.exports = router;