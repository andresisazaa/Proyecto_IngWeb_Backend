const Util = require('./purchaseUtil');
const MachineModel = require('../machine/machine');
const db = require("../../../config/db/sequelize");
let Purchase = require("../../../config/db/models/purchase");
let Employee = require("../../../config/db/models/employee");
let Provider = require("../../../config/db/models/provider");
let StatusPerMachine = require("../../../config/db/models/statusPerMachine");

Purchase = Purchase(db.sequelize, db.Sequelize);
Employee = Employee(db.sequelize, db.Sequelize);
Provider = Provider(db.sequelize, db.Sequelize);
StatusPerMachine = StatusPerMachine(db.sequelize, db.Sequelize);


Employee.hasMany(Purchase, { foreignKey: "empleado_id" });
Purchase.belongsTo(Employee, { foreignKey: "empleado_id" });

Provider.hasMany(Purchase, { foreignKey: "proveedor_id" });
Purchase.belongsTo(Provider, { foreignKey: "proveedor_id" });

//{model: Employee, where: {id: 1}}

const getAllPurchases = async () => {
    const purchases = await Purchase.findAll({ include: [Employee, Provider] });

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
    const purchase = await Purchase.findByPk(id, { include: [Employee, Provider] });

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
        }
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

const setMachinesStatuses = async (machines, purchaseDate) => {
    const machinesIds = machines.map(machine => machine.id);
    const statuses = machinesIds.map(id => ({
        estado_id: 1,
        maquina_id: id,
        fecha: purchaseDate
    }));
    const createdStatuses = await StatusPerMachine.bulkCreate(statuses);
    return createdStatuses;
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
    const statuses = await setMachinesStatuses(createdMachines, date);
    const updatedPurchase = await setPurchaseValue(createdMachines, purchaseId);
    return updatedPurchase;
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    createPurchase
}