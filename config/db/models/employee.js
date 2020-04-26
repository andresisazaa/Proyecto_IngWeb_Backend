module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Empleado', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        documento: {
            type: DataTypes.STRING(20),
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
        },
        cargo_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Cargo',
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
        habilitado: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        }
    }, {
        tableName: 'Empleado',
        timestamps: false
    });
};