module.exports = (sequelize, DataTypes) => {

    const Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        produto_id: {
            type: DataTypes.INTEGER,
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

    Token.associate = function (models) {
        Token.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto', onDelete: 'CASCADE' })
    };

    return Token;
}