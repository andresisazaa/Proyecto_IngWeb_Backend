const db = require('../../../config/db/sequelize');
let Employee = require('../../../config/db/models/employee');
let Job = require('../../../config/db/models/job');
let PointOfSale = require('../../../config/db/models/pointOfSale');

Employee = Employee(db.sequelize, db.Sequelize);
Job = Job(db.sequelize, db.Sequelize);
PointOfSale = PointOfSale(db.sequelize, db.Sequelize);

Job.hasMany(Employee, {foreignKey: 'cargo_id'});
Employee.belongsTo(Job, {foreignKey: 'cargo_id'});

PointOfSale.hasMany(Employee, {foreignKey: 'punto_de_venta_id'});
Employee.belongsTo(PointOfSale, {foreignKey: 'punto_de_venta_id'});


const createEmployee = async (body) => {
    const newEmployee = await Employee.create({
        nombre: body.name,
        documento: body.document,
        telefono: body.phone || null,
        email: body.email,
        direccion: body.location || null,
        cargo_id: body.job_id,
        punto_de_venta_id: body.point_of_sale
    });

    const employeeFormatted = {
        id: newEmployee.dataValues.id,
        name: newEmployee.dataValues.nombre,
        email: newEmployee.dataValues.email
    };
    return employeeFormatted;
}

const updateEmployee = async (id, body) => {
    const { name, document, phone, email, location, point_of_sale } = body;
    const employeeData = {
        nombre: name,
        documento: document,
        telefono: phone,
        email: email,
        direccion: location,
        punto_de_venta_id: point_of_sale
    };
    const [updatedRow] = await Employee.update({ ...employeeData }, { where: { id } });
    return updatedRow;
}

const getEmployees = async () => {
    const employees = await Employee.findAll({
        include: [ Job, PointOfSale ]
    });
    const employeesFormatted = employees.map(employee => {
        return {
            id: employee.dataValues.id,
            name: employee.dataValues.nombre,
            document: employee.dataValues.documento,
            phone: employee.dataValues.telefono,
            email: employee.dataValues.email,
            location: employee.dataValues.direccion,
            job: {
                id: employee.dataValues.cargo_id,
                name: employee.Cargo.nombre_cargo,
                salary: employee.Cargo.salario
            },
            point_of_sale: {
                id: employee.dataValues.punto_de_venta_id,
                name: employee.Punto_de_Ventum.nombre_pdv,
                location: employee.Punto_de_Ventum.direccion
            }
        };
    });
    return employeesFormatted;
}

const getEmployeeById = async (id) => {

    const employee = await Employee.findByPk(id, {
        include: [ Job, PointOfSale ]
    });
    if(!employee) return null;
    const employeeFormatted = {
        id: employee.dataValues.id,
        name: employee.dataValues.nombre,
        document: employee.dataValues.documento,
        phone: employee.dataValues.telefono,
        email: employee.dataValues.email,
        location: employee.dataValues.direccion,
        job: {
            id: employee.dataValues.cargo_id,
            name: employee.Cargo.nombre_cargo,
            salary: employee.Cargo.salario
        },
        point_of_sale: {
            id: employee.dataValues.punto_de_venta_id,
            name: employee.Punto_de_Ventum.nombre_pdv,
            location: employee.Punto_de_Ventum.direccion
        }
    };
    return employeeFormatted;
}

const deleteEmployee = async (id) => {
    const deletedRow = await Employee.destroy({ where: { id } });
    return deletedRow;
}

module.exports = {
    createEmployee,
    updateEmployee,
    getEmployees,
    getEmployeeById,
    deleteEmployee
};