const httpStatus = require('http-status');
const Provider = require('./provider');
const { getPermissions } = require('../../../config/firebase/index')

const getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.getAllProviders();
        return res
            .status(httpStatus.OK)
            .send(providers);
        
    } catch (error) {
        return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'No se pudo obtener la información de los proveedores' });
    }
}

const getProviderById = async (req, res) => {
    const { id } = req.params; 

    try {
        const provider = await Provider.getProviderById(id);

        if (provider) {
            return res
            .status(httpStatus.OK)
            .send(provider);
        } else {
            return res
            .status(httpStatus.NOT_FOUND)
            .send({message: "No existe el proveedor"});
        }
    } catch (error) {
        return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'No se pudo obtener la información del proveedor' });
    }
}

const createProvider = async (req, res) => {
    const { businessName, nit, email } = req.body;

    if (!businessName || !nit || !email) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const provider = await Provider.createProvider(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(provider);
    } catch (error) {
        return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'No se pudo crear el proveedor' });
    }
}

const updateProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const wasUpdated = await Provider.updateProviderById(id, req.body);

        if (wasUpdated) {
            return res
            .status(httpStatus.OK)
            .send({message: "Proveedor actualizado correctamente"});
        } else {
            return res
            .status(httpStatus.OK)
            .send({message: "No se ha actualizado ningún campo del proveedor"});
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo actualizar el proveedor' });
    }
}

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProviderById
}