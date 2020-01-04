const rootPrefix = "..",
  sequelizeProvider = require(rootPrefix + "/lib/providers/sequelize");

const Sequelize = require('sequelize');

class CartModel{
  definition(){
    let sequelize = sequelizeProvider.get();
    return sequelize.define('cart', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      },
      {
        underscored: true,
        timestamps: false
      })
  }
}

module.exports = new CartModel().definition();
