const db = require('../../../config/db/sequelize');
let PointOfSale = require('../../../config/db/models/pointOfSale');

PointOfSale = PointOfSale(db.sequelize, db.Sequelize);

const createPointOfSale = async (body) => {
    const { posName, address } = body;
    const newPointOfSale = await PointOfSale.create({
        nombre_pdv: posName,
        direccion: address
    });
    const pointOfSaleFormatted = {
        id: newPointOfSale.dataValues.id,
        posName: newPointOfSale.dataValues.nombre_pdv,
        address: newPointOfSale.dataValues.direccion
    };
    return pointOfSaleFormatted;
}

const getPointsOfSale = async () => {
    const pointsOfSale = await PointOfSale.findAll();
    const pointsOfSaleFormatted = pointsOfSale.map(pointOfSale => {
        return {
            id: pointOfSale.dataValues.id,
            posName: pointOfSale.dataValues.nombre_pdv,
            address: pointOfSale.dataValues.direccion
        };
    });
    return pointsOfSaleFormatted;
}

const getPointOfSaleById = async (id) => {
    const pointOfSale = await PointOfSale.findByPk(id);
    if (!pointOfSale) return null;
    const pointOfSaleFormatted = {
        id: pointOfSale.dataValues.id,
        posName: pointOfSale.dataValues.nombre_pdv,
        address: pointOfSale.dataValues.direccion
    };
    return pointOfSaleFormatted;
}

const updatePointOfSale = async (id, body) => {
    const { posName, address } = body;
    const posData = {
        nombre_pdv: posName,
        direccion: address
    };
    const [updatedRow] = await PointOfSale.update({ ...posData }, { where: { id } });
    return updatedRow;
}

const deletePointOfSale = async (id) => {
    const deletedRow = await PointOfSale.destroy({ where: { id } });
    return deletedRow;
}

module.exports = {
    createPointOfSale,
    getPointsOfSale,
    getPointOfSaleById,
    updatePointOfSale,
    deletePointOfSale
};