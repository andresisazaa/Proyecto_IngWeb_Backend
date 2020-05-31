const httpStatus = require('http-status');
const Model = require('./model');
const { isValidScope } = require('../../services/utils')

const component = 'Model';

const getAllModels = async (req, res) => {
     const role = res.locals.infoCurrentUser.job.id
const isPermitted = isValidScope(getAllModels.name, component, role)
if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    try {
        const models = await Model.getAllModels();
        return res
            .status(httpStatus.OK)
            .send(models);

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const getModelById = async (req, res) => {
     const role = res.locals.infoCurrentUser.job.id
const isPermitted = isValidScope(getModelById.name, component, role)
if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    const {id} = req.params;
    try {
        const model = await Model.getModelById(id);

        if (model) {
            return res
            .status(httpStatus.OK)
            .send(model);
        } else {
            return res
            .status(httpStatus.NOT_FOUND)
            .send({message: "No existe el modelo"});
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const createModel = async (req, res) => {
     const role = res.locals.infoCurrentUser.job.id
const isPermitted = isValidScope(createModel.name, component, role)
if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    const {modelName, brandId} = req.body;

    if (!modelName || !brandId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const model = await Model.createModel(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(model);

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const updateModelById = async (req, res) => {
     const role = res.locals.infoCurrentUser.job.id
const isPermitted = isValidScope(updateModelById.name, component, role)
if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    const { id } = req.params;

    try {
        const wasUpdated = await Model.updateModelById(id, req.body);

        if (wasUpdated) {
            return res
            .status(httpStatus.OK)
            .send({message: "Modelo actualizado correctamente"});
        } else {
            return res
            .status(httpStatus.OK)
            .send({message: "No se ha actualizado ningún campo del modelo"});
        }
        

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

module.exports = {
    getAllModels,
    getModelById,
    createModel,
    updateModelById
}