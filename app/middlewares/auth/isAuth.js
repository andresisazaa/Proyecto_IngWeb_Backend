const admin = require('firebase-admin');
const httpStatus = require('http-status');

const isAuth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(httpStatus.FORBIDDEN)
            .send({ message: 'No hay token en la cabereza de la petición' });
    }

    try {
        const token = req.headers.authorization;
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log('decodedToken', decodedToken);
        next();
    } catch (error) {
        console.error(error.message);
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ message: 'No estás autorizado' })
    }
}

module.exports = isAuth;