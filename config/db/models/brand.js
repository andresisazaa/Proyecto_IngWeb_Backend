module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Marca', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_marca: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: 'Marca',
        timestamps: false
    });
};