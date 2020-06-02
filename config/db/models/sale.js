module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Venta', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        valor_venta: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        cliente_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Cliente',
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
        tableName: 'Venta',
        timestamps: false
    });
};