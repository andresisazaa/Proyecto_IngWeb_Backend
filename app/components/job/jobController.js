const httpStatus = require('http-status');
const Job = require('./job');
const { getPermissions } = require('../../../config/firebase/index')


const getJobs = async (req, res) => {
    try {
        const jobs = await Job.getJobs();
        if (jobs.length > 0) {
            return res
                .status(httpStatus.OK)
                .send(jobs);
        } else if (jobs.length === 0) {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontraron cargos' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de los cargos' });
    }
}

const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.getJobById(id);
        if (job) {
            return res
                .status(httpStatus.OK)
                .send(job);
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontró el cargo' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const createJob = async (req, res) => {
    const { body } = req;
    try {
        const job = await Job.createJob(body);
        return res
            .status(httpStatus.CREATED)
            .send(job),
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

const updateJob = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const wasUpdated = await Job.updateJob(id, body);
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

const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await Job.deleteJob(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Cargo borrado correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Cargo no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};