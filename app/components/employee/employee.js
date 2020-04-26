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


const createEmployee = async (employeeData) => {

    const newEmployee = await Employee.create({
        nombre: employeeData.name,
        documento: employeeData.document,
        telefono: employeeData.phone,
        email: employeeData.email,
        direccion: employeeData.address,
        cargo_id: employeeData.jobId,
        punto_de_venta_id: employeeData.posId
    });

    const employeeFormatted = {
        id: newEmployee.id,
        name: newEmployee.nombre,
        email: newEmployee.email
    };

    return employeeFormatted;
}

const updateEmployee = async (id, employeeData) => {
    const { name, document, phone, email, address, posId, enabled } = employeeData;

    const employee = {
        nombre: name,
        documento: document,
        telefono: phone,
        email: email,
        direccion: address,
        punto_de_venta_id: posId,
        habilitado: enabled
    };
    const [updatedRow] = await Employee.update({ ...employee }, { where: { id } });

    return updatedRow;
}

const getEmployees = async () => {
    const employees = await Employee.findAll({
        include: [ Job, PointOfSale ]
    });

    const employeesFormatted = employees.map(employee => {
        return {
            id: employee.id,
            name: employee.nombre,
            document: employee.documento,
            phone: employee.telefono,
            email: employee.email,
            address: employee.direccion,
            enabled: employee.habilitado,
            job: {
                id: employee.cargo_id,
                name: employee.Cargo.nombre_cargo,
                salary: employee.Cargo.salario
            },
            pointOfSale: {
                id: employee.punto_de_venta_id,
                name: employee.Punto_de_Ventum.nombre_pdv,
                address: employee.Punto_de_Ventum.direccion
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
        id: employee.id,
        name: employee.nombre,
        document: employee.documento,
        phone: employee.telefono,
        email: employee.email,
        address: employee.direccion,
        enabled: employee.habilitado,
        job: {
            id: employee.cargo_id,
            name: employee.Cargo.nombre_cargo,
            salary: employee.Cargo.salario
        },
        pointOfSale: {
            id: employee.punto_de_venta_id,
            name: employee.Punto_de_Ventum.nombre_pdv,
            address: employee.Punto_de_Ventum.direccion
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