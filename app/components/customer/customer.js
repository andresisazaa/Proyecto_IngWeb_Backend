const db = require("../../../config/db/sequelize");
let Customer = require("../../../config/db/models/customer");

Customer = Customer(db.sequelize, db.Sequelize);

const getAllCustomers = async () => {
    const customers = await Customer.findAll();

    const customersFormatted = customers.map((customer) => ({
        id: customer.id,
        name: customer.nombre,
        document: customer.documento,
        number: customer.telefono,
        email: customer.email,
        address: customer.direccion
    }));

    return customersFormatted;
}

const getCustomerById = async (id) => {
    const customer = await Customer.findByPk(id);

    if (!customer) return null;

    const customerFormatted = {
        id: customer.id,
        name: customer.nombre,
        document: customer.documento,
        number: customer.telefono,
        email: customer.email,
        address: customer.direccion
    };

    return customerFormatted;
}

const createCustomer = async (customerData) => {
    const {name, document, number, email, address} = customerData;

    const customer = await Customer.create({
        nombre: name,
        documento: document,
        telefono: number,
        email: email,
        direccion: address
    });

    const customerFormatted = {
        id: customer.id,
        name: customer.nombre,
        document: customer.documento,
        number: customer.telefono,
        email: customer.email,
        address: customer.direccion
    };

    return customerFormatted;
}

const updateCustomerById = async (id, customerData) => {
    const {name, document, number, email, address} = customerData;
    
    const customer = {
        nombre: name,
        documento: document,
        telefono: number,
        email: email,
        direccion: address
    }

    const [ row ] = await Customer.update({ ...customer }, { where: { id } });
    return row;
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomerById
}