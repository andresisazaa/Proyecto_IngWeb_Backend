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

module.exports = {
    createEmployee
};