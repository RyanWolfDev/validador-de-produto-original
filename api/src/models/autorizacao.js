module.exports = (sequelize, DataTypes) => {

    const Autorizacao = sequelize.define('Autorizacao', {
        token_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        }
    }, {
        freezeTableName: true
    });

    Autorizacao.associate = function (models) {
        Autorizacao.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente', onDelete: 'cascade' })
        Autorizacao.belongsTo(models.Token, { foreignKey: 'token_id', as: 'token', onDelete: 'cascade' })
    };

    //Para não retornar a senha do Cliente
    Autorizacao.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());
        if (values.cliente)
            delete values.cliente.senha;
        return values;
    }

    return Autorizacao;
}