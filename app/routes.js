const { Router } = require('express');

const router = new Router();

const brands = require('./components/brand/brandRoute');

router.use('/brands', brands);

module.exports = router;