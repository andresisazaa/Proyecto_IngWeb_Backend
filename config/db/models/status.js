module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Estado', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_estado: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: 'Estado',
        timestamps: false
    });
};