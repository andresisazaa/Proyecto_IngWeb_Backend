module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Compra', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        valor_compra: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        proveedor_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Proveedor',
                key: 'id'
            }
        },
        empleado_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Empleado',
                key: 'id'
            }
        }
    }, {
        tableName: 'Compra',
        timestamps: false
    });
};