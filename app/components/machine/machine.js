const db = require("../../../config/db/sequelize");
let Machine = require("../../../config/db/models/machine");
let Model = require("../../../config/db/models/model");
//let Purchase = require("../../../config/db/models/purchase");
let PointOfSale = require("../../../config/db/models/pointOfSale");
let StatusPerMachine = require("../../../config/db/models/statusPerMachine");
let Status = require("../../../config/db/models/status");
//let Sale = require("../../../config/db/models/sale");

Machine = Machine(db.sequelize, db.Sequelize);
Model = Model(db.sequelize, db.Sequelize);
//Purchase = Purchase(db.sequelize, db.Sequelize);
PointOfSale = PointOfSale(db.sequelize, db.Sequelize);
//Sale = Sale(db.sequelize, db.Sequelize);
StatusPerMachine = StatusPerMachine(db.sequelize, db.Sequelize);
Status = Status(db.sequelize, db.Sequelize);

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

const getAllMachines = async () => {
    const machines = await Machine.findAll({include: [Model, PointOfSale, {model: StatusPerMachine, attributes: ['fecha'], include: Status}]});

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
            brand: machine.Modelo.marca_id
        },
        pointOfSale: {
            id: machine.Punto_de_Ventum.id,
            name: machine.Punto_de_Ventum.nombre_pdv,
            address: machine.Punto_de_Ventum.direccion
        },
        statuses: machine.Estado_por_Maquinas.map((state) => ({
            id: state.Estado.id,
            date: state.fecha,
            name: state.Estado.nombre_estado
        }))
    }));

    return machinesFormatted;
}

const getMachineById = async (id) => {
    const machine = await Machine.findByPk(id, {include: [Model, PointOfSale, {model: StatusPerMachine, attributes: ['fecha'], include: Status}]});

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
            brand: machine.Modelo.marca_id
        },
        pointOfSale: {
            id: machine.Punto_de_Ventum.id,
            name: machine.Punto_de_Ventum.nombre_pdv,
            address: machine.Punto_de_Ventum.direccion
        },
        statuses: machine.Estado_por_Maquinas.map((state) => ({
            id: state.Estado.id,
            date: state.fecha,
            name: state.Estado.nombre_estado
        }))
    };
    return machineFormatted;
}

module.exports = {
    getAllMachines,
    getMachineById
}