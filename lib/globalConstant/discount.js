const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic');

class Discount{
  get productSpecificDiscountType() {
    return 'product-specific';
  }
  
  get cartSpecificDiscountType() {
    return 'cart-specific';
  }
}

module.exports = new Discount();
