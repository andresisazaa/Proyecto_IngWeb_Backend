var Xlsx = require('xlsx');

const arrayToExcel = (arraySales, arrayPurchases) => {
    let formattedSalesExcelArray = arraySales.map(row => {
        return {
            'ID': row.id,
            'VALOR VENTA': row.saleValue,
            'FECHA VENTA': row.date,
            'PUNTO VENTA': row.pointOfSale,
            'DOCUMENTO EMPLEADO': row.employee.document,
            'NOMBRE EMPLEADO': row.employee.name,
            'EMAIL EMPLEADO': row.employee.email
        }
    });

    let formattedPurchasesExcelArray = arrayPurchases.map(row => {
        return {
            'ID': row.id,
            'VALOR COMPRA': row.purchaseValue,
            'FECHA COMPRA': row.date,
            'PUNTO COMPRA': row.pointOfSale,
            'DOCUMENTO EMPLEADO': row.employee.document,
            'NOMBRE EMPLEADO': row.employee.name,
            'EMAIL EMPLEADO': row.employee.email,
            'NIT PROVEEDOR': row.provider.nit,
            'NOMBRE PROVEEDOR': row.provider.businessName
        }
    });

    let workSheet = Xlsx.utils.json_to_sheet(formattedSalesExcelArray);
    let workSheet2 = Xlsx.utils.json_to_sheet(formattedPurchasesExcelArray);
    let workBook = Xlsx.utils.book_new();

    Xlsx.utils.book_append_sheet(workBook, workSheet, "Ventas del mes");
    Xlsx.utils.book_append_sheet(workBook, workSheet2, "Compras del mes");

    let workBookOut = Xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' });

    return workBookOut;
}

const groupByField = (array, field, totalField) => {
    var response = [];
    let group = array.reduce((r, a) => {
        r[a[field]] = [...r[a[field]] || [], a];
        return r;
    }, {});
    Object.entries(group).forEach(([key, value]) => {
        response.push({
            pointOfSale: key,
            total: value.reduce((ac, v) => ac + v[totalField], 0)
        })
    });
    return response;
}

module.exports = {
    arrayToExcel,
    groupByField
}