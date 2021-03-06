
const httpStatus = require('http-status');
const { isValidScope } = require('../../services/utils');
const Report = require('./report');

const component = 'Report';
const Utils = require('./reportUtil');

const getMonthlySalesReportFile = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    console.log(`ROL ${role}`);
    const isPermitted = await isValidScope(getMonthlySalesReportFile.name, component, role);
    console.log(`isPermitted ${isPermitted}`);
    if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    const posId = res.locals.infoCurrentUser.pointOfSale.id;
    let retrievedSales = await Report.getMonthlySalesReport(role, posId);
    let retrievedPurchases = await Report.getMonthlyPurchasesReport(role, posId);

    let arrayBytes = Utils.arrayToExcel(retrievedSales, retrievedPurchases);

    res.end(arrayBytes, 'binary');
}

const getMonthlySalesReportByPos = async (req, res) => {
    try {
        const role = res.locals.infoCurrentUser.job.id
        const isPermitted = await isValidScope(getMonthlySalesReportByPos.name, component, role)
        if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
        const posId = res.locals.infoCurrentUser.pointOfSale.id;
        let retrieved = await Report.getMonthlySalesReport(role, posId);
        let grouped = Utils.groupByField(retrieved, 'employeeDocument', 'saleValue');
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
        const isPermitted = await isValidScope(getMonthlyPurchasesReportByPos.name, component, role)
        if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
        const posId = res.locals.infoCurrentUser.pointOfSale.id;
        let retrieved = await Report.getMonthlyPurchasesReport(role, posId);
        let grouped = Utils.groupByField(retrieved, 'employeeDocument', 'purchaseValue');
        res.status(httpStatus.OK).send(grouped);
    } catch (error) {
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