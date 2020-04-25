const httpStatus = require('http-status');
const Employee = require('./employee');
const { sendEmail } = require('../../services/sendMail')

const createEmployee = async (req, res) => {
    const { body } = req;
    try {
        const employee = await Employee.createEmployee(body);
        const sendMail = await sendEmail(employee);
        if(sendMail){
            return res
                .status(httpStatus.CREATED)
                .send(employee),
                err => {
                    console.error(err);
                    return res
                        .status(httpStatus.BAD_REQUEST)
                        .send({ message: 'Error, datos incompletos' });
                }
            } else {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .send({ message: 'Error al enviar el correo'})
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