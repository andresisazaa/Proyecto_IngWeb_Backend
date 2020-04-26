const httpStatus = require('http-status');
const Employee = require('./employee');
const { register, sendPasswordResetLink } = require('../../../config/firebase/index')

const createEmployee = async (req, res) => {
    const { body } = req;
    try {
        if(body.name, body.email){
            const employee = await Employee.createEmployee(body);
            const signup = await register(employee)
            console.log('valor de retorno', signup);
            if(signup){
                const sendedMail = sendPasswordResetLink(employee);
                if(sendedMail){
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
            } else {
                return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error al registrar al usuario'})
            }
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