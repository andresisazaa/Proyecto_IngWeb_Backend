const db = require("../../../config/db/sequelize");
let Brand = require("../../../config/db/models/brand");
let Model = require("../../../config/db/models/model");

Brand = Brand(db.sequelize, db.Sequelize);
Model = Model(db.sequelize, db.Sequelize);

Brand.hasMany(Model, { foreignKey: "marca_id" });
Model.belongsTo(Brand, { foreignKey: "marca_id" });

const getAllModels = async () => {
  const models = await Model.findAll({ include: Brand });
  const modelsFormatted = models.map((model) => ({
    id: model.id,
    modelName: model.nombre_modelo,
    description: model.descripcion,
    brand: {
      id: model.Marca.id,
      brandName: model.Marca.nombre_marca,
    },
  }));
  return modelsFormatted;
};

const getModelById = async (id) => {
  const model = await Model.findByPk(id, { include: Brand });

  if (!model) return null;
  
  const modelFormatted = {
    id: model.id,
    modelName: model.nombre_modelo,
    description: model.descripcion,
    brand: {
      id: model.Marca.id,
      brandName: model.Marca.nombre_marca,
    },
  };
  return modelFormatted;
};

const createModel = async (modelData) => {
  const { modelName, description, brandId } = modelData;
  const model = await Model.create({
    nombre_modelo: modelName,
    descripcion: description,
    marca_id: brandId,
  });

  const modelFormatted = {
    id: model.id,
    modelName: model.nombre_modelo,
    description: model.descripcion,
  };
  return modelFormatted;
};

const updateModelById = async (id, modelData) => {
  const { modelName, description, brandId } = modelData;
  const model = {
    nombre_modelo: modelName,
    descripcion: description,
    marca_id: brandId,
  };
  const [ row ] = await Model.update({ ...model }, { where: { id } });
  return row;
};

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModelById
};
