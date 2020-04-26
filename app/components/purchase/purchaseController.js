const httpStatus = require('http-status');
const Purchase = require('./purchase');

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.getAllPurchases();
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
            .send({message: "No existe la compra"});
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de la compra' });
    }
}

module.exports = {
    getAllPurchases,
    getPurchaseById
}