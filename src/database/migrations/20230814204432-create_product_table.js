'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT(),
        allowNull: false
      },

      price: {
        type: Sequelize.INTEGER(),
        allowNull: false
      },

      quantity: {
        type: Sequelize.INTEGER(),
        allowNull: false
      },

      size: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
