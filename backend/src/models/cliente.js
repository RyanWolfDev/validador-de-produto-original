module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        }
    }, {
        freezeTableName: true
    });
    
    Cliente.associate = function (models) {
        Cliente.hasMany(models.Autorizacao, { foreignKey: 'cliente_id', as: 'autorizacoes', onDelete: 'cascade' })
    };

    //Para não retornar a senha na criação
    Cliente.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());
        delete values.senha;
        return values;
    }

    return Cliente;
}