const db = require("../../../config/db/sequelize");
let StatusPerMachine = require("../../../config/db/models/statusPerMachine");

StatusPerMachine = StatusPerMachine(db.sequelize, db.Sequelize);

const createMachinesStatuses = async (machines, date, status) => {
    const machinesIds = machines.map(machine => machine.id);
    const statuses = machinesIds.map(id => ({
        estado_id: status,
        maquina_id: id,
        fecha: date
    }));
    const createdStatuses = await StatusPerMachine.bulkCreate(statuses);
    return createdStatuses;
}

const createMachineStatus = async (machineId, date, status) => {

    const retrievedStatus = await StatusPerMachine.findAll({where: {estado_id: status, maquina_id: machineId }});

    
    if (retrievedStatus.length > 0) {
        return;
    }

    const statusData = {
        estado_id: status,
        maquina_id: machineId,
        fecha: date
    };

    const createdStatus = await StatusPerMachine.create(statusData);
    return createdStatus;
}

module.exports = {
    createMachinesStatuses,
    createMachineStatus
}