const { Router } = require('express');
const controller = require('./employeeController');

const router = new Router();

router.route('/')
    .post((req, res) => { controller.createEmployee(req, res) });

router.route('/:id')
    .put((req, res) => { controller.updateEmployee(req, res) });

router.route('/')
    .get((req, res) => { controller.getEmployees(req, res) });

router.route('/:id')
    .get((req, res) => { controller.getEmployeeById(req, res) });

router.route('/:id')
    .delete((req, res) => { controller.deleteEmployee(req, res) });

module.exports = router;