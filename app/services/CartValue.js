const Sequelize = require('sequelize');

const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  CartsModel = require(rootPrefix + '/models/Cart'),
  CommonValidators = require(rootPrefix + '/helpers/validators'),
  DiscountEngine = require(rootPrefix + '/lib/DiscountEngine/Main');

class CartValue extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    
    oThis.userId = params.user_id;
    oThis.cartData = {};
    oThis.productsInCartArray = [];
  
    oThis.cartDataWithDiscountDetails = null;
  }
  
  /**
   * Async Perform
   *
   * @returns {Promise<void>}
   * @private
   */
  async _asyncPerform(){
    const oThis = this;
    
    await oThis._validateAndSanitize();
    
    await oThis._fetchCartData();
    
    await oThis._fetchProductsData();
    
    await oThis._getDiscountDataFromDiscountEngine();
    
    return oThis._prepareResponse();
    
  }
  
  /**
   * Validate And Sanitize
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    const oThis = this;
    
    if(!CommonValidators.validateInteger(oThis.userId)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Given product id is not valid.'
      })
    }
  }
  
  /**
   * Fetch cart data
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchCartData() {
    const oThis = this;
    
    let queryResponse = await CartsModel.findAll({where: {user_id: oThis.userId}})
    
    for(let i = 0 ; i < queryResponse.length ; i++){
      oThis.cartData[queryResponse[i].dataValues.product_id] = {
        productId: queryResponse[i].dataValues.product_id,
        quantity: queryResponse[i].dataValues.quantity
      };
      
      oThis.productsInCartArray.push(queryResponse[i].dataValues.product_id)
    }
  }
  
  /**
   * Fetch products data for the products present in cart
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchProductsData() {
    const oThis = this;
    
    let queryResponse = await ProductsModel.findAll({where: {
        id: {
          [Sequelize.Op.or]: oThis.productsInCartArray
        }
      }
    });
    
    for(let i = 0 ; i < queryResponse.length ; i++){
      let rowData = queryResponse[i].dataValues;
      oThis.cartData[rowData.id].productName = rowData.product_name;
      oThis.cartData[rowData.id].price = rowData.price;
    }
  }
  
  /**
   * Get discount data from discount engine.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _getDiscountDataFromDiscountEngine() {
    const oThis = this;
    
    let discountEngineObject = new DiscountEngine({cartData: oThis.cartData});
    
    oThis.cartDataWithDiscountDetails = await discountEngineObject.perform();
  }
  
  /**
   * Prepare response
   *
   * @returns {null}
   * @private
   */
  _prepareResponse() {
    const oThis = this;
    
    return {
      success: true,
      products: oThis.cartDataWithDiscountDetails.products,
      cart_cost: oThis.cartDataWithDiscountDetails.cartCost,
      cart_cost_after_offer: oThis.cartDataWithDiscountDetails.cartCostAfterOffer,
      total_discount: oThis.cartDataWithDiscountDetails.totalDiscount
    }
  }
}

module.exports = CartValue;
