const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../../../config/db/sequelize");
let Sale = require("../../../config/db/models/sale");
let Purchase = require("../../../config/db/models/purchase");
let Employee = require("../../../config/db/models/employee");
let Provider = require("../../../config/db/models/provider");
let PointOfSale = require("../../../config/db/models/pointOfSale");

Sale = Sale(db.sequelize, db.Sequelize);
Purchase = Purchase(db.sequelize, db.Sequelize);
Employee = Employee(db.sequelize, db.Sequelize);
Provider = Provider(db.sequelize, db.Sequelize);
PointOfSale = PointOfSale(db.sequelize, db.Sequelize);

Employee.hasMany(Sale, { foreignKey: "empleado_id" });
Sale.belongsTo(Employee, { foreignKey: "empleado_id" });

Employee.hasMany(Purchase, { foreignKey: "empleado_id" });
Purchase.belongsTo(Employee, { foreignKey: "empleado_id" });

Provider.hasMany(Purchase, { foreignKey: "proveedor_id" });
Purchase.belongsTo(Provider, { foreignKey: "proveedor_id" });

PointOfSale.hasMany(Employee, { foreignKey: "punto_de_venta_id" });
Employee.belongsTo(PointOfSale, { foreignKey: "punto_de_venta_id" });

const endDate = new Date();
const startDate = new Date().setDate(new Date().getDate() - 30);

const getMonthlySalesReport = async (role, posId) => {
    // let date = new Date();
    // let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    // let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let selector;
    switch (role) {
        case 2:
            selector = { where: { fecha: { [Op.between]: [startDate, endDate] } },
                include: [{ model: Employee, where: { punto_de_venta_id: posId }, include: [PointOfSale]}]};
            break;
        case 3:
            selector = { where: { fecha: { [Op.between]: [startDate, endDate] } },
                include: [{ model: Employee, include: [PointOfSale]}]};
            break;
    }

    let sales = await Sale.findAll(selector);

    return sales.map(sale => ({
        id: sale.id,
        saleValue: sale.valor_venta,
        date: sale.fecha,
        pointOfSale: sale.Empleado.Punto_de_Ventum.nombre_pdv,
        employeeDocument: sale.Empleado.documento,
        employee: {
            document: sale.Empleado.documento,
            name: sale.Empleado.nombre,
            email: sale.Empleado.email
        }
    }));
}

const getMonthlyPurchasesReport = async (role, posId) => {

    let selector;
    switch (role) {
        case 2:
            selector = { where: { fecha: { [Op.between]: [startDate, endDate] } },
                include: [{ model: Employee, where: { punto_de_venta_id: posId }, include: [PointOfSale]}, Provider]};
            break;
        case 3:
            selector = { where: { fecha: { [Op.between]: [startDate, endDate] } },
                include: [{ model: Employee, include: [PointOfSale]}, Provider]};
            break;
    }

    let purchases = await Purchase.findAll(selector);

    return purchases.map(purchase => ({
        id: purchase.id,
        purchaseValue: purchase.valor_compra,
        date: purchase.fecha,
        pointOfSale: purchase.Empleado.Punto_de_Ventum.nombre_pdv,
        employeeDocument: purchase.Empleado.documento,
        employee: {
            document: purchase.Empleado.documento,
            name: purchase.Empleado.nombre,
            email: purchase.Empleado.email
        },
        provider: {
            businessName: purchase.Proveedor.razon_social,
            nit: purchase.Proveedor.nit
        }
    }));
}

module.exports = {
    getMonthlySalesReport,
    getMonthlyPurchasesReport
}
