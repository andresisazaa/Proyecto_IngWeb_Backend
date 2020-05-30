var Xlsx = require('xlsx');

const arrayToExcel = array => {

    let ws = Xlsx.utils.json_to_sheet(array);
    let wb = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, "Followres");
    let wbout = Xlsx.write(wb, { bookType: 'xlsx', type: 'binary' });

    return wbout;

}