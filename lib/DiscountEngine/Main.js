const rootPrefix = '../..',
  CartSpecificDiscount = require(rootPrefix + '/lib/DiscountEngine/CartSpecific'),
  ProductSpecificDiscount = require(rootPrefix + '/lib/DiscountEngine/ProductSpecific');

class DiscountEngineMain {
  constructor(params){
    const oThis = this;
    
    oThis.cartData = params.cartData;
  }
  
  /**
   * Perform
   *
   * @returns {Promise<*>}
   */
  async perform() {
    const oThis = this;
    
    let cartDataWithProductSpecificOffer = await oThis._applyProductSpecificDiscount(),
      cartSpecificDetails = await oThis._applyCartSpecificDiscount(cartDataWithProductSpecificOffer),
      responseObject = {
        products: cartDataWithProductSpecificOffer,
      };
    
    Object.assign(responseObject, cartSpecificDetails);
    return responseObject;
  }
  
  /**
   * Apply product specific discount
   *
   * @returns {Promise<void>}
   * @private
   */
  async _applyProductSpecificDiscount() {
    const oThis = this;
    
    let productSpecificDiscountObj = new ProductSpecificDiscount({cartData: oThis.cartData});
    
    return productSpecificDiscountObj.perform();
  }
  
  /**
   * Apply cart specific discount
   *
   * @returns {Promise<void>}
   * @private
   */
  async _applyCartSpecificDiscount(cartDataWithProductSpecificOffer) {
    const oThis = this;
    
    let cartSpecificDiscountObj = new CartSpecificDiscount({cartData: cartDataWithProductSpecificOffer});
    
    return cartSpecificDiscountObj.perform();
  }
}

module.exports = DiscountEngineMain;
