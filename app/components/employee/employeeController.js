const httpStatus = require('http-status');
const Employee = require('./employee');
const { register, sendPasswordResetLink } = require('../../../config/firebase/index');

const createEmployee = async (req, res) => {
    const { name, document, email, jobId, posId } = req.body;

    if (!name || !document || !email || !jobId || !posId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const registeredEmployee = await Employee.getEmployeeByEmail(email);
        if(registeredEmployee) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ message: `Error, el usuario con el correo '${email}' ya ha sido creado` });
        }        
        const employee = await Employee.createEmployee(req.body);
        const signup = await register(employee);

        if(signup){
            const sendedMail = sendPasswordResetLink(employee);

            if(sendedMail) {
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
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear el cargo' });
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const wasUpdated = await Employee.updateEmployee(id, req.body);
        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Actualizado correctamente' });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: 'No se actualizó el empleado, la información es igual' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const getEmployees = async (_, res) => {    
    try {
        const employees = await Employee.getEmployees();
        return res
                .status(httpStatus.OK)
                .send(employees);
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const getEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.getEmployeeById(id);
        
        if (employee) {
            return res
                .status(httpStatus.OK)
                .send(employee);
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontró el empleado' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await Employee.deleteEmployee(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Empleado borrado correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Empleado no encontrado' });
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
    updateEmployee,
    getEmployees,
    getEmployeeById,
    deleteEmployee
};