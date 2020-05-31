
const Sale = require('./sale');
const httpStatus = require('http-status');

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
    const {customerId, machinesId} = req.body;

    if (!customerId || !machinesId) {
        return res.status(httpStatus.BAD_REQUEST).send({message: "Parámetros incorrectos"});
    }

    const employeeId = res.locals.infoCurrentUser.id;

    try {
        const sale = await Sale.createSale(customerId, machinesId, employeeId);
        return res.status(httpStatus.CREATED).send(sale);
    } catch (error) {
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({message: "No se pudo crear la venta"});
    }
}

module.exports = {
    getAllSales,
    getSaleById,
    createSale
}