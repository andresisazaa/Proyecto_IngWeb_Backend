const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../../../config/db/sequelize");
let Sale = require("../../../config/db/models/sale");
let Employee = require("../../../config/db/models/employee");
let PointOfSale = require("../../../config/db/models/pointOfSale");
let Customer = require("../../../config/db/models/customer");
let Machine = require("../../../config/db/models/machine");
let Model = require("../../../config/db/models/model");

const saleUtil = require('./saleUtil');

Sale = Sale(db.sequelize, db.Sequelize);
Employee = Employee(db.sequelize, db.Sequelize);
PointOfSale = PointOfSale(db.sequelize, db.Sequelize);
Customer = Customer(db.sequelize, db.Sequelize);
Machine = Machine(db.sequelize, db.Sequelize);
Model = Model(db.sequelize, db.Sequelize);

Employee.hasMany(Sale, { foreignKey: "empleado_id" });
Sale.belongsTo(Employee, { foreignKey: "empleado_id" });

PointOfSale.hasMany(Employee, { foreignKey: "punto_de_venta_id" });
Employee.belongsTo(PointOfSale, { foreignKey: "punto_de_venta_id" });

Customer.hasMany(Sale, { foreignKey: "cliente_id" });
Sale.belongsTo(Customer, { foreignKey: "cliente_id" });

Sale.hasMany(Machine, { foreignKey: "venta_id" });
Machine.belongsTo(Sale, { foreignKey: "venta_id" });

Model.hasMany(Machine, { foreignKey: "modelo_id" });
Machine.belongsTo(Model, { foreignKey: "modelo_id" });


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

const getAllSales = async () => {
    const sales = Sale.findAll({include: [
        {model: Customer, attributes: ["nombre"]}, 
        {model: Employee, attributes: ["nombre"], 
            include: [{model: PointOfSale, attributes: ["nombre_pdv"]}]}
    ]});

    const salesFormatted = sales.map((sale) => ({
        id: sale.id,
        saleValue: sale.valor_venta,
        date: sale.fecha,
        customerName: sale.Cliente.nombre,
        employeeName: sale.Empleado.nombre,
        posName: sale.Empleado.Punto_de_Ventum.nombre_pdv
    }));

    return salesFormatted;
} 

const getSaleById = async (id) => {

    const sale = await Sale.findByPk(id, {include: [
        {model: Customer, attributes: ["nombre"]},
        {model: Employee, attributes: ["nombre"], 
            include: [{model: PointOfSale, attributes: ["nombre_pdv"]}]},
        {model: Machine, include: [
            {model: Model, attributes: ["nombre_modelo"]}
        ]}
    ]});

    const salesFormatted = {
        id: sale.id,
        saleValue: sale.valor_venta,
        date: sale.fecha,
        customerName: sale.Cliente.nombre,
        employeeName: sale.Empleado.nombre,
        posName: sale.Empleado.Punto_de_Ventum.nombre_pdv,
        machines: sale.Maquinas.map((maquina) => ({
            id: maquina.id,
            type: maquina.tipo,
            saleValue: maquina.valor_venta,
            modelName: maquina.Modelo.nombre_modelo
        }))
    };
    return salesFormatted;
}

const createSale = async (customerId, machinesId, employeeId) => {
    const machines = await saleUtil.getMachines(machinesId);
    const saleValue = await saleUtil.calculateSaleValue(machines);

    const date = saleUtil.getDate();
    console.log("La fecha que llega es: ", date);

    const saleData = {
        valor_venta: saleValue,
        fecha: date,
        cliente_id: customerId,
        empleado_id: employeeId
    }

    const sale = await Sale.create(saleData);

    await saleUtil.updateMachines(machines, sale.id);

    const saleFormatted = {
        id: sale.id,
        saleValue: sale.valor_venta,
        date
    }
    console.log(saleFormatted.date);

    return saleFormatted;
}


module.exports = {
    getMonthlySalesReport: getMonthlySalesReport,
    getAllSales,
    getSaleById, 
    createSale
}