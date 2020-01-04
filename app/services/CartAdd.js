const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  CartsModel = require(rootPrefix + '/models/Cart'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

class CartAdd extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    oThis.productId = params.product_id;
    oThis.userId = 1; // TODO: remove this hardcoding after adding cookie validation
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
    
    await oThis._validateProductId();
    
    await oThis._insertOrUpdateCart();
    
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
    
    if(!CommonValidators.validateInteger(oThis.productId)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Given product id is not valid.'
      })
    }
  }
  
  /**
   * Validate product id
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateProductId() {
    const oThis = this;
    
    let productData = await ProductsModel.findAll({
      where: {id: oThis.productId}
    });
    
    //Given product id is not present in the system
    if(productData.length === 0){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Given product id is not present in the system.'
      })
    }
  }
  
  /**
   * Inserts or update cart.
   *
   * @returns {Promise<never>}
   * @private
   */
  async _insertOrUpdateCart() {
    const oThis = this;
  
    CartsModel.findAll({ where: { product_id: oThis.productId, user_id: oThis.userId }})
      .then(function (cartData) {
        // Check if record exists in db
        if (cartData.length > 0) {
          CartsModel.increment('quantity', { where: { product_id: oThis.productId, user_id: oThis.userId } })
        } else {
          CartsModel.create({
            product_id: oThis.productId,
            user_id: oThis.userId,
            quantity: 1
          })
        }
      });
  }
  
  /**
   *
   * @returns {{code: number, success: boolean}}
   * @private
   */
  _prepareResponse() {
    const oThis = this;

    return {
      success: true,
      code: 200
    };
  }
}

module.exports = CartAdd;
