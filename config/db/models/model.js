module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Modelo', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_modelo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        marca_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Marca',
                key: 'id'
            }
        }
    }, {
        tableName: 'Modelo',
        timestamps: false
    });
};