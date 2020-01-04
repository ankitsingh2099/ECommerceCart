'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobile_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      encryption_salt: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },{
      underscored: true,
      timestamps: true
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
