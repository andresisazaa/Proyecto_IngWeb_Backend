const httpStatus = require('http-status');
const Purchase = require('./purchase');
const Util = require('./purchaseUtil');
const { isValidScope } = require('../../services/utils')

const component = 'Purchase';

const getAllPurchases = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(getAllPurchases.name, component, role)
    if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    try {
        const employeeId = res.locals.infoCurrentUser.id;
        const posId = res.locals.infoCurrentUser.pointOfSale.id;
        const purchases = await Purchase.getAllPurchases(role, employeeId, posId);
        return res
            .status(httpStatus.OK)
            .send(purchases);

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las compras' });
    }
}

const getPurchaseById = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(getPurchaseById.name, component, role)
    if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    const { id } = req.params;

    try {
        const purchase = await Purchase.getPurchaseById(id);

        if (purchase) {
            return res
                .status(httpStatus.OK)
                .send(purchase);
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: "No existe la compra" });
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de la compra' });
    }
}

const createPurchase = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(createPurchase.name, component, role)
    if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    const { providerId, machines } = req.body;
    const employee = {
        id: res.locals.infoCurrentUser.id,
        posId: res.locals.infoCurrentUser.pointOfSale.id
    }
    
    if (!providerId || machines.length === 0) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }
    try {
        const purchase = await Purchase.createPurchase(employee, req.body);
        if (purchase) {
            return res
                .status(httpStatus.OK)
                .send(purchase);
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error' });
    }
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    createPurchase
}