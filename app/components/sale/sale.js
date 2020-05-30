const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../../../config/db/sequelize");
let Sale = require("../../../config/db/models/sale");
let Employee = require("../../../config/db/models/employee");
let PointOfSale = require("../../../config/db/models/pointOfSale");

Sale = Sale(db.sequelize, db.Sequelize);
Employee = Employee(db.sequelize, db.Sequelize);
PointOfSale = PointOfSale(db.sequelize, db.Sequelize);

Employee.hasMany(Sale, { foreignKey: "empleado_id" });
Sale.belongsTo(Employee, { foreignKey: "empleado_id" });

PointOfSale.hasMany(Employee, { foreignKey: "punto_de_venta_id" });
Employee.belongsTo(PointOfSale, { foreignKey: "punto_de_venta_id" });


const getMonthlySalesReport = async () => {
    let date = new Date();
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let sales = await Sale.findAll({
        where: {
            fecha: { [Op.between]: [startDate, endDate] }
        },
        include: [{
            model: Employee, include: [
                PointOfSale
            ]
        }]
    });

    const formattedSales = sales.map(sale => ({
        id: sale.id,
        saleValue: sale.valor_venta,
        date: sale.fecha,
        pointOfSale: sale.Empleado.Punto_de_Ventum.nombre_pdv,
        employee: {
            document: sale.Empleado.documento,
            name: sale.Empleado.nombre,
            email: sale.Empleado.email
        }
    }));
    return formattedSales;
}

module.exports = {
    getMonthlySalesReport: getMonthlySalesReport
}