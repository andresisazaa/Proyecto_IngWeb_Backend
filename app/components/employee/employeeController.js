const httpStatus = require('http-status');
const Employee = require('./employee');

const createEmployee = async (req, res) => {
    const { body } = req;
    try {
        const employee = await Employee.createEmployee(body);
        return res
            .status(httpStatus.CREATED)
            .send(employee),
            err => {
                console.error(err);
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .send({ message: 'Error, datos incompletos' });
            }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear el cargo' });
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const wasUpdated = await Employee.updateEmployee(id, body);
        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Actualizado correctamente' });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: 'No se actualizó el cargo, la información es igual' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    createEmployee,
    updateEmployee
};