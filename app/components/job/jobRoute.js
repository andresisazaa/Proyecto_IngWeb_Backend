const { Router } = require('express');
const controller = require('./jobController');

const router = new Router();

router.route('/')
    .get((req, res) => { controller.getJobs(req, res) });

router.route('/:id')
    .get((req, res) => { controller.getJobById(req, res) });

router.route('/')
    .post((req, res) => { controller.createJob(req, res) });

router.route('/:id')
    .put((req, res) => { controller.updateJob(req, res) });

router.route('/:id')
    .delete((req, res) => { controller.deleteJob(req, res) });

module.exports = router;