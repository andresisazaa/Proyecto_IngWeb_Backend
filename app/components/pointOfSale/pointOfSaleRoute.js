const { Router } = require('express');
const controller = require('./pointOfSaleController');

const router = new Router();

router.route('/')
    .get((req, res) => { controller.getPointsOfSale(req, res) });

router.route('/:id')
    .get((req, res) => { controller.getPointOfSaleById(req, res) });

router.route('/')
    .post((req, res) => { controller.createPointOfSale(req, res) });

router.route('/:id')
    .put((req, res) => { controller.updatePointOfSale(req, res) });

/*router.route('/:id')
    .delete((req, res) => { controller.deletePointOfSale(req, res) });*/

module.exports = router;