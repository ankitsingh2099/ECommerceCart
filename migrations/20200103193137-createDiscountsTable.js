'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('discounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      extra_data: {
        type: Sequelize.JSON,
        allowNull: true
      }
    },{
      underscored: true,
      timestamps: true
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('discounts');
  }
};
