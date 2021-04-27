'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('produto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sku: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imagemUrl: {
        allowNull: true,
        type: DataTypes.STRING,
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
    return queryInterface.dropTable('produto');
  }
};
