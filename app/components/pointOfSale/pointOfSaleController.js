const httpStatus = require('http-status');
const PointOfSale = require('./pointOfSale');

const getPointsOfSale = async (req, res) => {
    try {
        const pointsOfSale = await PointOfSale.getPointsOfSale();
        if (pointsOfSale.length > 0) {
            return res
                .status(httpStatus.OK)
                .send(pointsOfSale);
        } else if (pointsOfSale.length === 0) {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontraron puntos de venta' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de los puntos de venta' });
    }
}

const getPointOfSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const pointsOfSale = await PointOfSale.getPointOfSaleById(id);
        if (pointsOfSale) {
            return res
                .status(httpStatus.OK)
                .send(pointsOfSale);
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontró el punto de venta' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const createPointOfSale = async (req, res) => {
    const { body } = req;
    try {
        const pointsOfSale = await PointOfSale.createPointOfSale(body);
        return res
            .status(httpStatus.CREATED)
            .send(pointsOfSale),
            err => {
                console.error(err);
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .send({ message: 'Error, datos incompletos' });
            }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear el punto de venta' });
    }
}

const updatePointOfSale = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const wasUpdated = await PointOfSale.updatePointOfSale(id, body);
        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Actualizado correctamente' });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: 'No se actualizó el punto de venta, la información es igual' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const deletePointOfSale = async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await PointOfSale.deletePointOfSale(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Punto de venta borrado correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Punto de venta no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getPointsOfSale,
    getPointOfSaleById,
    createPointOfSale,
    updatePointOfSale,
    deletePointOfSale
};