const httpStatus = require('http-status');
const Model = require('./model');

const getAllModels = async (req, res) => {
    try {
        const models = await Model.getAllModels();
        return res
            .status(httpStatus.OK)
            .send(models);

    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const getModelById = async (req, res) => {
    const {id} = req.params;
    try {
        const models = await Model.getModelById(id);
        return res
            .status(httpStatus.OK)
            .send(models);

    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const createModel = async (req, res) => {
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
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const updateModelById = async (req, res) => {
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
        console.error(error);
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