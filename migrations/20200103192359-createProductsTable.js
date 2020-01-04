'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      }
    },{
      underscored: true,
      timestamps: true
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
