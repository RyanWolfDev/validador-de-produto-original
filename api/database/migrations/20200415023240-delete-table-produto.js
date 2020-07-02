'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produto');

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produto');

  }
};
