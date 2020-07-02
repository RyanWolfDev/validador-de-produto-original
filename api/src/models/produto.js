module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        imagemUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },

    },
        {
            freezeTableName: true
        });

    Produto.associate = function (models) {
        Produto.hasMany(models.Token, { as: 'tokens', foreignKey: 'produto_id' })
    };

    return Produto;
}