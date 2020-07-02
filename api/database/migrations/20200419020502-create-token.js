'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('token', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      produto_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'produto',
          key: 'id',
        },
      },
      ativo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('token');

  }
};
