const { Router } = require('express');

const router = new Router();

const brands = require('./components/brand/brandRoute');
const pointsOfSale = require('./components/pointOfSale/pointOfSaleRoute');

router.use('/brands', brands);
router.use('/pos', pointsOfSale)
module.exports = router;