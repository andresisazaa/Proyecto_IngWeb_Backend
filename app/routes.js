const { Router } = require('express');

const router = new Router();

const brands = require('./components/brand/brandRoute');
const pointsOfSale = require('./components/pointOfSale/pointOfSaleRoute');
const jobs = require('./components/job/jobRoute');
const models = require('./components/model/modelRoute');
const purchases = require('./components/purchase/purchaseRoute');
const machines = require('./components/machine/machineRoute');
const employees = require('./components/employee/employeeRoute');
const customers = require('./components/customer/customerRoute');
const providers = require('./components/provider/providerRoute');
const sales = require('./components/sale/saleRoute');
const reports = require('./components/report/reportRoute');

router.use('/brands', brands);
router.use('/pos', pointsOfSale);
router.use('/jobs', jobs);
router.use('/models', models);
router.use('/purchases', purchases);
router.use('/machines', machines);
router.use('/employees', employees);
router.use('/customers', customers);
router.use('/providers', providers);
router.use('/sales', sales);
router.use('/reports', reports);

module.exports = router;