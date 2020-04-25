const { Router } = require('express');

const router = new Router();

const brands = require('./components/brand/brandRoute');
const pointsOfSale = require('./components/pointOfSale/pointOfSaleRoute');
const jobs = require('./components/job/jobRoute');
const models = require('./components/model/modelRoute');
const purchases = require('./components/purchase/purchaseRoute');
const machines = require('./components/machine/machineRoute');

router.use('/brands', brands);
router.use('/pos', pointsOfSale);
router.use('/jobs', jobs);
router.use('/models', models);
router.use('/purchases', purchases);
router.use('/machines', machines);


module.exports = router;