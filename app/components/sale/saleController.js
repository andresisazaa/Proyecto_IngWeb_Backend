
const Sale = require('./sale');
const Xlsx = require('xlsx');
const { isValidScope } = require('../../services/utils')

const component = 'Sale';

const getMonthlySalesReport = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
const isPermitted = isValidScope(getMonthlySalesReport.name, component, role)
if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    let retrieved = await Sale.getMonthlySalesReport();

    let formattedExcelArray = retrieved.map(row => {
       return {
           id: row.id,
           saleValue: row.saleValue,
           date: row.date,
           pointOfSale: row.pointOfSale,
           employeeDocument: row.employee.document,
           employeeName: row.employee.name,
           employeeEmail: row.employee.email
       }
    });

    let ws = Xlsx.utils.json_to_sheet(formattedExcelArray);
    let wb = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, "Reporte de ventas del mes");
    let wbout = Xlsx.write(wb, { bookType: 'xlsx', type: 'binary' });

    res.end(wbout, 'binary');
}

module.exports = {
    getMonthlySalesReport: getMonthlySalesReport
}