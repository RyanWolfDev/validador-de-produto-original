'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('adm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      login: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
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
    return queryInterface.dropTable('adm');
  }
};
