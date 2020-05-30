const db = require("../../../config/db/sequelize");
let Machine = require("../../../config/db/models/machine");
let Model = require("../../../config/db/models/model");
//let Purchase = require("../../../config/db/models/purchase");
let PointOfSale = require("../../../config/db/models/pointOfSale");
let StatusPerMachine = require("../../../config/db/models/statusPerMachine");
let Status = require("../../../config/db/models/status");
let Brand = require("../../../config/db/models/brand");
const StatusPerMachineModel = require("../statusPerMachine/statusPerMachine");
const util = require("../purchase/purchaseUtil");

//let Sale = require("../../../config/db/models/sale");

Machine = Machine(db.sequelize, db.Sequelize);
Model = Model(db.sequelize, db.Sequelize);
//Purchase = Purchase(db.sequelize, db.Sequelize);
PointOfSale = PointOfSale(db.sequelize, db.Sequelize);
//Sale = Sale(db.sequelize, db.Sequelize);
StatusPerMachine = StatusPerMachine(db.sequelize, db.Sequelize);
Status = Status(db.sequelize, db.Sequelize);
Brand = Brand(db.sequelize, db.Sequelize);

Model.hasMany(Machine, { foreignKey: "modelo_id" });
Machine.belongsTo(Model, { foreignKey: "modelo_id" });

//Sale.hasMany(Machine, { foreignKey: "venta_id" });
//Machine.belongsTo(Sale, { foreignKey: "venta_id" });

PointOfSale.hasMany(Machine, { foreignKey: "punto_de_venta_id" });
Machine.belongsTo(PointOfSale, { foreignKey: "punto_de_venta_id" });

//Purchase.hasMany(Machine, { foreignKey: "compra_id" });
//Machine.belongsTo(Purchase, { foreignKey: "compra_id" });

Machine.hasMany(StatusPerMachine, { foreignKey: "maquina_id" });
StatusPerMachine.belongsTo(Machine, { foreignKey: "maquina_id" });

Status.hasMany(StatusPerMachine, { foreignKey: "estado_id" });
StatusPerMachine.belongsTo(Status, { foreignKey: "estado_id" });

Brand.hasMany(Model, { foreignKey: "marca_id" });
Model.belongsTo(Brand, { foreignKey: "marca_id" });

const getAllMachines = async (posId, status) => {
  let machines = []
  console.log(status);
  //Get all the machines
  if (!status) {
    machines = await Machine.findAll({
      include: [
        { model: PointOfSale, where: { id: posId }},
        { model: StatusPerMachine, attributes: ["fecha"], include: Status },
        { model: Model, include: Brand }
      ],
    });

  //Get the machines status to sell
  } else {

    machines = await Machine.findAll({
      include: [
        { model: PointOfSale, where: { id: posId }},
        { model: StatusPerMachine, attributes: ["fecha"], include: Status, 
        where: { estado_id: status}},
        { model: Model, include: Brand }
      ],
    });
  }

  const machinesFormatted = machines.map((machine) => ({
    id: machine.id,
    type: machine.tipo,
    purchaseValue: machine.valor_compra,
    saleValue: machine.valor_venta,
    purchaseId: machine.compra_id,
    saleId: machine.venta_id,
    model: {
      id: machine.Modelo.id,
      name: machine.Modelo.nombre_modelo,
      brand: machine.Modelo.Marca.nombre_marca,
    },
    pointOfSale: {
      id: machine.Punto_de_Ventum.id,
      name: machine.Punto_de_Ventum.nombre_pdv,
      address: machine.Punto_de_Ventum.direccion,
    },
    statuses: machine.Estado_por_Maquinas.map((state) => ({
      id: state.Estado.id,
      date: state.fecha,
      name: state.Estado.nombre_estado,
    })),
  }));

  return machinesFormatted;
};

const getMachineById = async (id) => {
  const machine = await Machine.findByPk(id, {
    include: [
      PointOfSale,
      { model: StatusPerMachine, attributes: ["fecha"], include: Status },
      { model: Model, include: Brand }
    ],
  });

  if (!machine) return null;

  const machineFormatted = {
    id: machine.id,
    type: machine.tipo,
    purchaseValue: machine.valor_compra,
    saleValue: machine.valor_venta,
    purchaseId: machine.compra_id,
    saleId: machine.venta_id,
    model: {
      id: machine.Modelo.id,
      name: machine.Modelo.nombre_modelo,
      brand: machine.Modelo.Marca.nombre_marca,
    },
    pointOfSale: {
      id: machine.Punto_de_Ventum.id,
      name: machine.Punto_de_Ventum.nombre_pdv,
      address: machine.Punto_de_Ventum.direccion,
    },
    statuses: machine.Estado_por_Maquinas.map((state) => ({
      id: state.Estado.id,
      date: state.fecha,
      name: state.Estado.nombre_estado,
    })),
  };
  return machineFormatted;
};

const createMachines = async (requireData, machines) => {
  const machinesData = machines.map((machine) => ({
    tipo: machine.type,
    valor_compra: machine.purchaseValue,
    modelo_id: machine.modelId,
    compra_id: requireData.purchaseId,
    punto_de_venta_id: requireData.posId,
  }));
  const newMachines = await Machine.bulkCreate(machinesData);

  return newMachines;
};

//Cambiar el estado y crear la relación

//? Para que en tal caso, me permita actualizar el precio de venta
// Get maquina a maquina y actualizo su valor de venta, en caso de que
// machinesData este presente
const updateMachines = async (status, machinesId) => {
  const date = util.getDate();

  const machinesFormatted = machinesId.map((id) => ({
      id
  }));

  const result = await StatusPerMachineModel.createMachinesStatuses(
    machinesFormatted,
    date,
    status
  );
  return result;
};

const updateMachineById = async (id, status, machineData) => {
  const { type, posId, saleValue, modelId } = machineData;
  const machine = {
    tipo: type,
    punto_de_venta_id: posId,
    valor_venta: saleValue,
    modelo_id: modelId
  };
  const [row] = await Machine.update({ ...machine }, { where: { id } });

  if (status) {
    const date = util.getDate();
    const result = await StatusPerMachineModel.createMachineStatus(id, date, status);
  }
  return row;
};

module.exports = {
  getAllMachines,
  getMachineById,
  createMachines,
  updateMachines,
  updateMachineById
};
