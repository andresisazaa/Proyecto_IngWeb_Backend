module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Proveedor', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        razon_social: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        nit: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(60),
            allowNull: true
        }
    }, {
        tableName: 'Proveedor',
        timestamps: false
    });
};