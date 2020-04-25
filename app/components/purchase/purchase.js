const db = require("../../../config/db/sequelize");
let Purchase = require("../../../config/db/models/purchase");
let Employee = require("../../../config/db/models/employee");
let Provider = require("../../../config/db/models/provider")

Purchase = Purchase(db.sequelize, db.Sequelize);
Employee = Employee(db.sequelize, db.Sequelize);
Provider = Provider(db.sequelize, db.Sequelize);

Employee.hasMany(Purchase, { foreignKey: "empleado_id" });
Purchase.belongsTo(Employee, { foreignKey: "empleado_id" });

Provider.hasMany(Purchase, { foreignKey: "proveedor_id" });
Purchase.belongsTo(Provider, { foreignKey: "proveedor_id" });

//{model: Employee, where: {id: 1}}

const getAllPurchases = async () => {
    const purchases = await Purchase.findAll({include: [Employee, Provider]});

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
    const purchase = await Purchase.findByPk(id, {include: [Employee, Provider]});

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

module.exports = {
    getAllPurchases,
    getPurchaseById
}