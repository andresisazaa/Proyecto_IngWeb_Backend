const { Router } = require('express');
const controller = require('./brandController');

const router = new Router();

router.route('/')
    .get((req, res) => { controller.getBrands(req, res) });

router.route('/:id')
    .get((req, res) => { controller.getBrandById(req, res) });

router.route('/')
    .post((req, res) => { controller.createBrand(req, res) });

router.route('/:id')
    .put((req, res) => { controller.updateBrand(req, res) });

router.route('/:id')
    .delete((req, res) => { controller.deleteBrand(req, res) });

module.exports = router;