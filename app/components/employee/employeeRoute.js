const { Router } = require('express');
const controller = require('./employeeController');

const router = new Router();

router.route('/')
    .post((req, res) => { controller.createEmployee(req, res) });

module.exports = router;