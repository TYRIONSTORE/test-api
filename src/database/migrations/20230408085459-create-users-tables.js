'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      walletId: {
        type: Sequelize.TEXT(),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      phoneNum: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      password: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('unverified', 'active', 'suspended'),
        defaultValue: 'unverified',
        allowNull: false
      },
      emailVerifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastLoginAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('users');
  }
};
