const httpStatus = require('http-status');
const Employee = require('./employee');
const { isValidScope } = require('../../services/utils')

const component = 'Employee';

const createEmployee = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(createEmployee.name, component, role)
    if (!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });

    const { name, document, email, jobId, posId } = req.body;

    if (!name || !document || !email || !jobId || !posId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }

    try {
        const registeredEmployee = await Employee.getEmployeeByEmail(email);
        if (registeredEmployee) { 
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ message: `Error, el usuario con el correo '${email}' ya ha sido creado` });
        }
        const employee = await Employee.createEmployee(req.body);
        const signup = await register(employee);

        if (signup) {
            const sendedMail = sendPasswordResetLink(employee);

            if (sendedMail) {
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
                    .send({ message: 'Error al enviar el correo' })
            }
        } else {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error al registrar al usuario' })
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear el cargo' });
    }
}

const updateEmployee = async (req, res) => {
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(updateEmployee.name, component, role)
    if (!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });

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
    const role = res.locals.infoCurrentUser.job.id;
    const isPermitted = await isValidScope(getEmployees.name, component, role)
    if (!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
    try {
        const posId = res.locals.infoCurrentUser.pointOfSale.id;
        const employees = await Employee.getEmployees(role, posId);
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
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(getEmployeeById.name, component, role)
    if (!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });

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
    const role = res.locals.infoCurrentUser.job.id
    const isPermitted = await isValidScope(deleteEmployee.name, component, role)
    if (!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });

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

const getEmployeeByEmail = async (req, res) =>{
    const {email} = req.body;

    if (!email) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: 'Parámetros incorrectos' });
    }
    
    try {
        const employee = await Employee.getEmployeeByEmail(email);
        return res
            .status(httpStatus.OK)
            .send(employee);
    } catch (error) {        
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error al enviar el correo' })
    }
}

module.exports = {
    createEmployee,
    updateEmployee,
    getEmployees,
    getEmployeeById,
    deleteEmployee, 
    getEmployeeByEmail
};