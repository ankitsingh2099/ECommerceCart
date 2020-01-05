const rootPrefix = "..",
  sequelizeProvider = require(rootPrefix + "/lib/providers/sequelize");

const Sequelize = require('sequelize');

class DiscountModel{
  definition(){
    let sequelize = sequelizeProvider.get();
    return sequelize.define('discount', {
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
      },
      {
        underscored: true,
        timestamps: false
      })
  }
}

module.exports = new DiscountModel().definition();
