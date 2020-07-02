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
      token_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'produto',
          key: 'id',
        },
      },
      cliente_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'produto',
          key: 'id',
        }
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
