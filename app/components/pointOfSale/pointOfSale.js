const db = require("../../../config/db/sequelize");
let PointOfSale = require("../../../config/db/models/pointOfSale");

PointOfSale = PointOfSale(db.sequelize, db.Sequelize);

//Anadir relaciones en caso de que se requieran
//Model.hasMany(model, {foreignKey: value})

const createPointOfSale = async (posData) => {
  const { posName, address } = posData;

  const newPointOfSale = await PointOfSale.create({
    nombre_pdv: posName,
    direccion: address,
  });

  const pointOfSaleFormatted = {
    id: newPointOfSale.id,
    posName: newPointOfSale.nombre_pdv,
    address: newPointOfSale.direccion,
  };
  return pointOfSaleFormatted;
};

const getPointsOfSale = async () => {
  const pointsOfSale = await PointOfSale.findAll();
  const pointsOfSaleFormatted = pointsOfSale.map((pointOfSale) => ({
    id: pointOfSale.id,
    posName: pointOfSale.nombre_pdv,
    address: pointOfSale.direccion,
  }));

  return pointsOfSaleFormatted;
};

const getPointOfSaleById = async (id) => {
  const pointOfSale = await PointOfSale.findByPk(id);

  if (!pointOfSale) return null;

  const pointOfSaleFormatted = {
    id: pointOfSale.id,
    posName: pointOfSale.nombre_pdv,
    address: pointOfSale.direccion,
  };

  return pointOfSaleFormatted;
};

const updatePointOfSale = async (id, posData) => {
  const { posName, address } = posData;

  const pos = {
    nombre_pdv: posName,
    direccion: address,
  };

  const [row] = await PointOfSale.update(
    { ...pos },
    { where: { id } }
  );
  
  return row;
};

const deletePointOfSale = async (id) => {
  const deletedRow = await PointOfSale.destroy({ where: { id } });
  return deletedRow;
};

module.exports = {
  createPointOfSale,
  getPointsOfSale,
  getPointOfSaleById,
  updatePointOfSale,
  deletePointOfSale,
};
