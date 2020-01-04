const rootPrefix = "..",
  sequelizeProvider = require(rootPrefix + "/lib/providers/sequelize");

const Sequelize = require('sequelize');

class ProductModel{
  definition(){
    let sequelize = sequelizeProvider.get();
    return sequelize.define('product', {
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
      },
      {
        underscored: true,
        timestamps: false
      })
  }
}

module.exports = new ProductModel().definition();
