const httpStatus = require('http-status');
const Machine = require('./machine');
const { isValidScope } = require('../../services/utils')

const component = 'Machine';

const getAllMachines = async (req, res) => {

    // Get pos Id to filter
    const employee = {
        id: res.locals.infoCurrentUser.id,
        posId: res.locals.infoCurrentUser.pointOfSale.id,
    }

    let status = req.query.status;

    if(status != '1' && status != '2' && status!= '3') {
        status = null;
    }

    try {
        const machines = await Machine.getAllMachines(employee.posId, status);
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

    let { status } = req.body;
    const { machineData } = req.body;

    if (status != 1 && status != 2) {
        status = null;
    }

    try {
        const wasUpdated = await Machine.updateMachineById(id, status, machineData);

        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: "Máquina actualizada correctamente" });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: "No se ha actualizado ningún campo de la máquina" });
        }

    } catch (error) {
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo actualizar la máquina' });
    }
}

/*const updateMachines = async (req, res) => {
    const {status, machineIds} = req.body;

    if (!status || machineIds.length === 0) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const result = await Machine.updateMachines(req.body.status, req.body.machineIds);

        if (result) {
            return res
            .status(httpStatus.OK)
            .send(result);
        } else {
            return res
            .status(httpStatus.OK)
            .send({message: "No se puede cambiar el status ni crear la informacion en estado por máquina"});
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo actualizar la máquina y sus estados' });
    }
}*/

module.exports = {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachineById,
    //updateMachines
}