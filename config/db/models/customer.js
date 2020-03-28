module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cliente', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        documento: {
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
        tableName: 'Cliente',
        timestamps: false
    });
};