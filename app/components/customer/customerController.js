const httpStatus = require('http-status');
const Customer = require('./customer');
const { isValidScope } = require('../../services/utils');

const component = 'Customer';

const getAllCustomers = async (req, res) => {
     if(!isValidScope(getAllCustomers.name, component)) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción'});
    try {
        const customers = await Customer.getAllCustomers();
        return res
            .status(httpStatus.OK)
            .send(customers);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de los clientes' });
    }
}

const getCustomerById = async (req, res) => {
     if(!isValidScope(getCustomerById.name, component)) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción'});
    const { id } = req.params;

    try {
        const customer = await Customer.getCustomerById(id);

        if(customer) {
            return res
            .status(httpStatus.OK)
            .send(customer);
        } else {
            return res
            .status(httpStatus.NOT_FOUND)
            .send({message: "No existe el cliente"});
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de los clientes' });
    }
}

const createCustomer = async (req, res) => {
     if(!isValidScope(createCustomer.name, component)) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción'});
    const { name, document, email } = req.body;

    if(!name || !document || !email) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const customer = await Customer.createCustomer(req.body);

        return res
            .status(httpStatus.CREATED)
            .send(customer);

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear el cliente' });
    }
}

const updateCustomerById = async (req, res) => {
     if(!isValidScope(updateCustomerById.name, component)) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción'});
    const { id } = req.params;

    try {
        const wasUpdated = await Customer.updateCustomerById(id, req.body);

        if (wasUpdated) {
            return res
            .status(httpStatus.OK)
            .send({message: "Cliente actualizado correctamente"});
        } else {
            return res
            .status(httpStatus.OK)
            .send({message: "No se ha actualizado ningún campo del cliente"});
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo actualizar el cliente' });
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomerById
}