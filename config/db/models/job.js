module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cargo', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_cargo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        salario: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 'Cargo',
        timestamps: false
    });
};