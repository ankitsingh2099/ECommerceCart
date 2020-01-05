const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  CartsModel = require(rootPrefix + '/models/Cart'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

class CartRemove extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    oThis.productId = params.product_id;
    oThis.userId = params.user_id;
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
    
    await oThis._updateOrDeleteFromCart();
    
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
   * Updates or deletes from cart
   *
   * @returns {Promise<never>}
   * @private
   */
  async _updateOrDeleteFromCart() {
    const oThis = this;
    
    return new Promise(async function(onResolve, onReject){
      CartsModel.findAll({ where: { product_id: oThis.productId, user_id: oThis.userId }})
        .then(function (cartData) {
          // Check if record exists in db
          if(cartData.length === 0){
            return onReject({
              success: false,
              code: 422,
              error: 'Given product id is not present in cart.'
            })
          }
          if (cartData[0].dataValues.quantity > 1) {
            CartsModel.decrement('quantity', { where: { product_id: oThis.productId, user_id: oThis.userId } })
          } else {
            CartsModel.destroy({where: {
                product_id: oThis.productId,
                user_id: oThis.userId
              }
            })
          }
          return onResolve();
        });
    })
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

module.exports = CartRemove;
