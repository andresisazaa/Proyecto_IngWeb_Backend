const httpStatus = require('http-status');
const Employee = require('../../components/employee/employee');

const infoUser = async (_, res, next) => {

    try {
        const user = await Employee.getEmployeeById(res.locals.infoCurrentUser.id);        
        if(!user) {
            return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ message: 'No estás autorizado' })
        }
        res.locals.infoCurrentUser = user;
        next();
    } catch (error) {
        console.error(error.message);
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ message: 'No estás autorizado' })
    }
}

module.exports = infoUser;