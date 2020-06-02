const { Router } = require('express');
const controller = require('./brandController');

const router = new Router();

router.route('/')
    .get(controller.getBrands);

router.route('/:id')
    .get(controller.getBrandById);

router.route('/')
    .post(controller.createBrand);

router.route('/:id')
    .put(controller.updateBrand);

router.route('/:id')
    .delete(controller.deleteBrand);

module.exports = router;