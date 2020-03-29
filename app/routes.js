const { Router } = require('express');

const router = new Router();

const brands = require('./components/brand/brandRoute');
const pointsOfSale = require('./components/pointOfSale/pointOfSaleRoute');
const jobs = require('./components/job/jobRoute');

router.use('/brands', brands);
router.use('/pos', pointsOfSale);
router.use('/jobs', jobs);

module.exports = router;