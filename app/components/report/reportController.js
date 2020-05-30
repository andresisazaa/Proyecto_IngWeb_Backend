
const httpStatus = require('http-status');
const { isValidScope } = require('../../services/utils');
const Report = require('./report');

const component = 'Report';
const Utils = require('./reportUtil');

const getMonthlySalesReportFile = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = isValidScope(getMonthlySalesReportFile.name, component, role)
    if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    let retrievedSales = await Report.getMonthlySalesReport();
    let retrievedPurchases = await Report.getMonthlyPurchasesReport();

    let arrayBytes = Utils.arrayToExcel(retrievedSales, retrievedPurchases);

    res.end(arrayBytes, 'binary');
}

const getMonthlySalesReportByPos = async (req, res) => {
    try {
        const role = res.locals.infoCurrentUser.job.id
        const isPermitted = isValidScope(getMonthlySalesReportFile.name, component, role)
        if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
        let retrieved = await Report.getMonthlySalesReport();
        let grouped = Utils.groupByField(retrieved, 'pointOfSale', 'saleValue');
        res.status(httpStatus.OK).send(grouped);
    } catch (error) {
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: "No se pudo crear la venta" });
    }
}

const getMonthlyPurchasesReportByPos = async (req, res) => {
    try {
        const role = res.locals.infoCurrentUser.job.id
        const isPermitted = isValidScope(getMonthlySalesReportFile.name, component, role)
        if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
        let retrieved = await Report.getMonthlyPurchasesReport();
        let grouped = Utils.groupByField(retrieved, 'pointOfSale', 'purchaseValue');
        res.status(httpStatus.OK).send(grouped);
    } catch (error) {
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: "No se pudo crear el reporte de ventas mensual" });
    }
}

module.exports = {
    getMonthlySalesReportFile,
    getMonthlySalesReportByPos,
    getMonthlyPurchasesReportByPos
}