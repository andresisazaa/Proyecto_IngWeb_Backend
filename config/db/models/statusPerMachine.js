module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Estado_por_Maquina', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Estado',
                key: 'id'
            }
        },
        maquina_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Maquina',
                key: 'id'
            }
        }
    }, {
        tableName: 'Estado_por_Maquina',
        timestamps: false
    });
};