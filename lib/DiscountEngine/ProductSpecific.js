const Sequelize = require('sequelize');

const rootPrefix = '../..',
  DiscountModel = require(rootPrefix + '/models/Discount'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  CartsModel = require(rootPrefix + '/models/Cart'),
  CommonValidators = require(rootPrefix + '/helpers/validators'),
  discountConstants = require(rootPrefix + '/lib/globalConstant/discount');

class ProductSpecificDiscount {
  constructor(params){
    const oThis = this;
    oThis.cartData = params.cartData;
    
    oThis.productSpecificDiscountData = {};
  }
  
  /**
   * Async Perform
   *
   * @returns {Promise<void>}
   */
  async perform(){
    const oThis = this;
    //fetch discount data based on type and product id
    await oThis._fetchProductSpecificDiscountData();
    
    //compute discount applicable for each product and update cart data accordingly
    oThis._processDiscountData();
    
    return oThis.cartData;
  }
  
  /**
   * Fetch product specific discount data.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchProductSpecificDiscountData() {
    const oThis = this;
    
    let productsArray = Object.keys(oThis.cartData),
      queryResponse = await DiscountModel.findAll({ where: {
        product_id: {
          [Sequelize.Op.or]: productsArray
        },
        type: discountConstants.productSpecificDiscountType
      }
    });
    
    for(let i = 0 ; i < queryResponse.length ; i++){
      let rowData = queryResponse[i].dataValues;
      oThis.productSpecificDiscountData[rowData.product_id] = rowData.extra_data;
    }
  }
  
  /**
   * Process discount
   *
   */
  _processDiscountData() {
    const oThis = this;
    
    for(let productId in oThis.cartData) {
      let quantity = oThis.cartData[productId].quantity;
      let eligibleQuantityForMultiOffer = null;
      for(let multipleCount in oThis.productSpecificDiscountData[productId]){
        if(multipleCount <= quantity){
          if(eligibleQuantityForMultiOffer == null || multipleCount > eligibleQuantityForMultiOffer){
            eligibleQuantityForMultiOffer = multipleCount;
          }
        }
      }
      let finalCostWithoutOffer = quantity * parseFloat(oThis.cartData[productId].price),
        finalCostForProduct = finalCostWithoutOffer;
      if(eligibleQuantityForMultiOffer){
        let numberOfPiecesWithoutOffer = quantity - parseInt(eligibleQuantityForMultiOffer),
          costOfPiecesWithoutOffer = numberOfPiecesWithoutOffer * parseFloat(oThis.cartData[productId].price);
        
        finalCostForProduct = costOfPiecesWithoutOffer + oThis.productSpecificDiscountData[productId][eligibleQuantityForMultiOffer]
      }
      oThis.cartData[productId].cost = finalCostWithoutOffer;
      oThis.cartData[productId].costAfterOffer = finalCostForProduct;
    }
  }
}

module.exports = ProductSpecificDiscount;
