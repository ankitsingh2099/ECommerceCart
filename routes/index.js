const express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = "..",
  ProductsController = require(rootPrefix + '/app/controllers/Products');

router.get('/products', ProductsController.productsList);

module.exports = router;
