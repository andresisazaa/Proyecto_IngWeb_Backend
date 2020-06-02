const Util = require('./purchaseUtil');
const MachineModel = require('../machine/machine');
const db = require("../../../config/db/sequelize");
const StatusPerMachineModel = require('../statusPerMachine/statusPerMachine');

let Purchase = require("../../../config/db/models/purchase");
let Employee = require("../../../config/db/models/employee");
let Provider = require("../../../config/db/models/provider");
let Machine = require("../../../config/db/models/machine");
let Model = require("../../../config/db/models/model");
let Brand = require("../../../config/db/models/brand");

Purchase = Purchase(db.sequelize, db.Sequelize);
Employee = Employee(db.sequelize, db.Sequelize);
Provider = Provider(db.sequelize, db.Sequelize);
Machine = Machine(db.sequelize, db.Sequelize);
Model = Model(db.sequelize, db.Sequelize);
Brand = Brand(db.sequelize, db.Sequelize);

Employee.hasMany(Purchase, { foreignKey: "empleado_id" });
Purchase.belongsTo(Employee, { foreignKey: "empleado_id" });

Provider.hasMany(Purchase, { foreignKey: "proveedor_id" });
Purchase.belongsTo(Provider, { foreignKey: "proveedor_id" });

Provider.hasMany(Purchase, { foreignKey: "proveedor_id" });
Purchase.belongsTo(Provider, { foreignKey: "proveedor_id" });

Purchase.hasMany(Machine, { foreignKey: "compra_id" });
Machine.belongsTo(Purchase, { foreignKey: "compra_id" });

Model.hasMany(Machine, { foreignKey: "modelo_id" });
Machine.belongsTo(Model, { foreignKey: "modelo_id" });

Brand.hasMany(Model, { foreignKey: "marca_id" });
Model.belongsTo(Brand, { foreignKey: "marca_id" });

const getAllPurchases = async (role, employeeId, posId) => {
    let selector;
    switch (role) {
        case 1:
            selector = { include: [{ model: Employee, where: { id: employeeId, punto_de_venta_id: posId }}, Provider] }
            break;
        case 2:
            selector = { include: [{ model: Employee, where: { punto_de_venta_id: posId }}, Provider] };
            break;
        case 3:
            selector = { include: [Employee, Provider] };
            break;
    }

    const purchases = await Purchase.findAll(selector);

    const purchasesFormatted = purchases.map((purchase) => ({
        id: purchase.id,
        purchaseValue: purchase.valor_compra,
        date: purchase.fecha,
        employee: {
            id: purchase.Empleado.id,
            name: purchase.Empleado.nombre,
            identification: purchase.Empleado.documento,
            email: purchase.Empleado.email
        },
        provider: {
            id: purchase.Proveedor.id,
            businessName: purchase.Proveedor.razon_social,
            nit: purchase.Proveedor.nit
        }
    }));
    return purchasesFormatted;
}

const getPurchaseById = async (id) => {
    const purchase = await Purchase.findByPk(id, {
        include: [Employee, Provider, { model: Machine,
            include: [{ model: Model, include: Brand }] 
        }] 
    });
    const machines = purchase.Maquinas.map(machine => {
        return {
            id: machine.id,
            type: machine.tipo,
            purchaseValue: machine.valor_compra,
            model: {
                id: machine.Modelo.id,
                name: machine.Modelo.nombre_modelo,
                brand: machine.Modelo.Marca.nombre_marca
            }
        }
    })

    if (!purchase) return null;

    const purchaseFormatted = {
        id: purchase.id,
        purchaseValue: purchase.valor_compra,
        date: purchase.fecha,
        employee: {
            id: purchase.Empleado.id,
            name: purchase.Empleado.nombre,
            identification: purchase.Empleado.documento,
            email: purchase.Empleado.email
        },
        provider: {
            id: purchase.Proveedor.id,
            businessName: purchase.Proveedor.razon_social,
            nit: purchase.Proveedor.nit
        },
        machines: machines
    }
    return purchaseFormatted;
}

const setPurchaseValue = async (machines, purchaseId) => {
    const value = Util.calculatePurchaseValue(machines);
    let purchase = await Purchase.findByPk(purchaseId);
    if (!purchase) {
        throw new Error('No se pudo obtener');
    }
    purchase.valor_compra = value;
    return await purchase.save();
}

const createPurchase = async (employee, purchaseData) => {
    const { providerId, machines } = purchaseData;
    const date = Util.getDate();
    const purchase = await Purchase.create({
        valor_compra: 0,
        fecha: date,
        proveedor_id: providerId,
        empleado_id: employee.id
    });
    if (!purchase) {
        throw new Error('Ocurrió un error creando la compra');
    }
    const { id: purchaseId } = purchase;
    const requiredData = {
        id: employee.id,
        posId: employee.posId,
        purchaseId: purchaseId
    }
    const createdMachines = await MachineModel.createMachines(requiredData, machines);
    const statuses = await StatusPerMachineModel.createMachinesStatuses(createdMachines, date, 1);
    const updatedPurchase = await setPurchaseValue(createdMachines, purchaseId);
    return updatedPurchase;
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    createPurchase
}