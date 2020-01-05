const rootPrefix = '../..',
  DiscountModel = require(rootPrefix + '/models/Discount'),
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  CartsModel = require(rootPrefix + '/models/Cart'),
  CommonValidators = require(rootPrefix + '/helpers/validators'),
  discountConstants = require(rootPrefix + '/lib/globalConstant/discount');

class CartSpecificDiscount {
  constructor(params){
    const oThis = this;
    oThis.cartData = params.cartData;
    
    oThis.cartSpecificDiscountExtraData = null
  }
  
  /**
   * Async Perform
   *
   * @returns {Promise<void>}
   */
  async perform(){
    const oThis = this;
    //fetch discount data based on type and product id
    await oThis._fetchCartSpecificDiscountData();
    
    //compute discount applicable for each product and update cart data accordingly
    return oThis._processCartSpecificDiscount();
  }
  
  /**
   * Fetch cart specific discount data.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchCartSpecificDiscountData() {
    const oThis = this;
  
    let queryResponse = await DiscountModel.findAll({
      where: {
        product_id: null,
        type: discountConstants.cartSpecificDiscountType
      }
    });
  
    oThis.cartSpecificDiscountExtraData = queryResponse[0].dataValues.extra_data;
  }
  
  /**
   * Process cart specific discount.
   *
   * @returns {{cartCost: *, cartCostAfterOffer: *, totalDiscount: number}}
   * @private
   */
  _processCartSpecificDiscount() {
    const oThis = this;
    
    let cartCost = 0,
      cartCostAfterOffer = 0;
    for(let productId in oThis.cartData){
      cartCost += oThis.cartData[productId].cost;
      cartCostAfterOffer += oThis.cartData[productId].costAfterOffer;
    }
    
    let finalCartCost = cartCostAfterOffer;
    for(let eligiblePriceForOffer in oThis.cartSpecificDiscountExtraData){
      if(cartCostAfterOffer > eligiblePriceForOffer){
        finalCartCost = cartCostAfterOffer - oThis.cartSpecificDiscountExtraData[eligiblePriceForOffer];
      }
    }
    
    return {
      cartCost: cartCost,
      cartCostAfterOffer: finalCartCost,
      totalDiscount: cartCost - finalCartCost,
    }
  }
}

module.exports = CartSpecificDiscount;
