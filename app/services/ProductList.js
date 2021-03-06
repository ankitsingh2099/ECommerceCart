const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

const PAGE_LENGTH = 10;
class GetProducts extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    oThis.pageNumber = params.page_number || 1;
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
    
    let dbRows = await oThis._fetchAvailableProducts();
    
    return oThis._prepareResponse(dbRows);
    
  }
  
  /**
   * Validate And Sanitize
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    const oThis = this;
  
    if(!CommonValidators.validateInteger(oThis.pageNumber)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Given page number is not valid.'
      })
    }
  }
  
  /**
   * Fetch Available Products
   *
   * @returns {Promise<never>}
   * @private
   */
  async _fetchAvailableProducts() {
    const oThis = this;
    
    return ProductsModel.findAll({
      offset:((oThis.pageNumber - 1) * PAGE_LENGTH),
      limit : PAGE_LENGTH,
    });
  }
  
  /**
   * Prepares Response
   *
   * @param dbRows
   * @returns {{result_type: string, is_next_page_present: boolean, products: []}}
   * @private
   */
  _prepareResponse(dbRows) {
    const oThis = this;
    
    let responseData = {
      success: true,
      result_type: 'products',
      products: [],
      is_next_page_present: false
    };
    
    if(dbRows.length === PAGE_LENGTH){
      responseData.is_next_page_present = true;
    }
    
    for(let i = 0 ; i < dbRows.length ; i++){
      responseData.products.push(dbRows[i].dataValues);
    }
    
    return responseData;
  }
}

module.exports = GetProducts;
