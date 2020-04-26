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

module.exports = {
    createMachinesStatuses
}