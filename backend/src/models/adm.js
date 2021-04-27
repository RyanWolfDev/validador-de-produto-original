module.exports = (sequelize, DataTypes) => {
    const Adm = sequelize.define('Adm', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
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

    //Para não retornar a senha na criação
    Adm.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());
        delete values.senha;
        return values;
    }

    return Adm;
}