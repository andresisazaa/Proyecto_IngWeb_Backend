const machineService = require('../machine/machine');

const getDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    if (month < 9) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

const getMachines = async (machinesId) => {
    const machines = [];

    for (machineId of machinesId) {
        machines.push(await machineService.getMachineById(machineId));
    }

    return machines;
}

const calculateSaleValue = async (machines) => {
    let totalSaleValue = 0;

    for (machine of machines) {
        totalSaleValue += machine.saleValue;
    }

    return totalSaleValue;
}

const updateMachines = async (machines, saleId) => {

    for (machine of machines) {
        let machineData = {saleId};
        await machineService.updateMachineById(machine.id, 3, machineData);
    }
}

module.exports = {
    getDate,
    getMachines,
    calculateSaleValue,
    updateMachines
}