const { Router } = require('express');

const router = new Router();

const brands = require('./components/brand/brandRoute');
const pointsOfSale = require('./components/pointOfSale/pointOfSaleRoute');
const jobs = require('./components/job/jobRoute');
const models = require('./components/model/modelRoute');

router.use('/brands', brands);
router.use('/pos', pointsOfSale);
router.use('/jobs', jobs);
router.use('/models', models);

module.exports = router;