const db = require('../../../config/db/sequelize');
let Job = require('../../../config/db/models/job');

Job = Job(db.sequelize, db.Sequelize);

const createJob = async (body) => {
    const { jobName, salary } = body;
    const newJob = await Job.create({
        nombre_cargo: jobName,
        salario: salary
    });

    const jobFormatted = {
        id: newJob.dataValues.id,
        jobName: newJob.dataValues.nombre_cargo,
        salary: newJob.dataValues.salario
    };
    return jobFormatted;
}

const getJobs = async () => {
    const jobs = await Job.findAll();
    const jobsFormatted = jobs.map(job => {
        return {
            id: job.dataValues.id,
            jobName: job.dataValues.nombre_cargo,
            salary: job.dataValues.salario
        };
    });
    return jobsFormatted;
}

const getJobById = async (id) => {
    const job = await Job.findByPk(id);
    if (!job) return null;
    const jobFormatted = {
        id: job.dataValues.id,
        jobName: job.dataValues.nombre_cargo,
        salary: job.dataValues.salario
    };
    return jobFormatted;
}

const updateJob = async (id, body) => {
    const { jobName, salary } = body;
    const jobData = {
        nombre_cargo: jobName,
        salario: salary
    };
    const [updatedRow] = await Job.update({ ...jobData }, { where: { id } });
    return updatedRow;
}

const deleteJob = async (id) => {
    const deletedRow = await Job.destroy({ where: { id } });
    return deletedRow;
}

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};