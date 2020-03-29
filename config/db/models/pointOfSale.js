module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Punto_de_Venta', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_pdv: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }, {
        tableName: 'Punto_de_Venta',
        timestamps: false
    });
};