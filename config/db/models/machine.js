module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Maquina', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        valor_compra: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        valor_venta: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        modelo_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Modelo',
                key: 'id'
            }
        },
        punto_de_venta_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Punto_de_Venta',
                key: 'id'
            }
        },
        compra_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Compra',
                key: 'id'
            }
        },
        venta_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Venta',
                key: 'id'
            }
        }
    }, {
        tableName: 'Maquina',
        timestamps: false
    });
};