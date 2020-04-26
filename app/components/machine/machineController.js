const httpStatus = require('http-status');
const Machine = require('./machine');

const getAllMachines = async (req, res) => {
    try {
        const machines = await Machine.getAllMachines();
        return res
            .status(httpStatus.OK)
            .send(machines);

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const getMachineById = async (req, res) => {
    const { id } = req.params;
    try {
        const machine = await Machine.getMachineById(id);

        if (machine) {
            return res
                .status(httpStatus.OK)
                .send(machine);
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: "No existe la máquina" });
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de la máquina' });
    }
}

const createMachine = async (req, res) => {
    const { modelName, brandId } = req.body;

    if (!modelName || !brandId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const model = await Machine.createMachine(req.body);
        return res
            .status(httpStatus.CREATED)
            .send(model);

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const updateMachineById = async (req, res) => {
    const { id } = req.params;

    try {
        const wasUpdated = await Machine.updateMachineById(id, req.body);

        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: "Machineo actualizado correctamente" });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: "No se ha actualizado ningún campo del modelo" });
        }

    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

module.exports = {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachineById
}