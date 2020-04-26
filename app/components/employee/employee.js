const db = require('../../../config/db/sequelize');
let Employee = require('../../../config/db/models/employee');

Employee = Employee(db.sequelize, db.Sequelize);

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
        email: newEmployee.dataValues.email,
        cargo_id: newEmployee.dataValues.cargo_id
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

module.exports = {
    createEmployee,
    updateEmployee
};