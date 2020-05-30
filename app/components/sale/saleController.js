
const Sale = require('./sale');
const httpStatus = require('http-status');
const Xlsx = require('xlsx');


const getMonthlySalesReport = async (req, res) => {

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

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.getAllSales()
        return res
            .status(httpStatus.OK)
            .send(sales);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({message: "No se pueden traer las ventas"});
    }
}

const getSaleById = async (req, res) => {
    const {id} = req.params;

    try {
        const sale = await Sale.getSaleById(id);
        return res.status(httpStatus.OK).send(sale);
    } catch (error) {
        return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({message: "No se puede traer la venta"});
        
    }
}

const createSale = async (req, res) => {
    const {clientId, machinesId} = req.body;

    if (!clientId || !machinesId) {
        return res.status(httpStatus.BAD_REQUEST).send({message: "Parámetros incorrectos"});
    }

    const employeeId = res.locals.infoCurrentUser.id;

    try {
        const sale = await Sale.createSale(clientId, machinesId, employeeId);
        return res.status(httpStatus.CREATED).send(sale);
    } catch (error) {
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({message: "No se pudo crear la venta"});
    }

}

module.exports = {
    getMonthlySalesReport: getMonthlySalesReport,
    getAllSales,
    getSaleById,
    createSale
}