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

const calculatePurchaseValue = (machines) => {
    const machinesPrices = machines.map(machine => machine.valor_compra);
    const totalPurchaseValue = machinesPrices.reduce((prev, curr) => prev + curr, 0);
    return totalPurchaseValue;
}

module.exports = {
    getDate,
    calculatePurchaseValue
};