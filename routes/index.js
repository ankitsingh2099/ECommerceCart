const express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = "..",
  ProductsController = require(rootPrefix + '/app/controllers/Products'),
  CartController = require(rootPrefix + '/app/controllers/Cart');

router.get('/products', ProductsController.productsList);

router.post('/cart/add', CartController.add);

router.post('/cart/remove', CartController.remove);

router.get('/cart/value', CartController.value);

module.exports = router;
