const rootPrefix = '../..';

exports.add = function (req, res) {
  const CartAddService = require(rootPrefix + '/app/services/CartAdd');
  let cartAdd = new CartAddService(req.decodedParams);
  
  cartAdd.perform().then(function(serviceResponse){
    if(!serviceResponse){
      res.status(500).json({});
    } else {
      if(serviceResponse.success){
        res.status(200).json(serviceResponse);
        res.send();
      } else {
        let errorCode = serviceResponse.code || 500;
        res.status(errorCode).json(serviceResponse);
      }
    }
  });
};

exports.remove = function (req, res) {
  const CartRemoveService = require(rootPrefix + '/app/services/CartRemove');
  let cartRemove = new CartRemoveService(req.decodedParams);
  
  cartRemove.perform().then(function(serviceResponse){
    if(!serviceResponse){
      res.status(500).json({});
    } else {
      if(serviceResponse.success){
        res.status(200).json(serviceResponse);
        res.send();
      } else {
        let errorCode = serviceResponse.code || 500;
        res.status(errorCode).json(serviceResponse);
      }
    }
  });
};

exports.value = function (req, res) {
  const CartValueService = require(rootPrefix + '/app/services/CartValue');
  let cartValue = new CartValueService(req.decodedParams);
  
  cartValue.perform().then(function(serviceResponse){
    if(!serviceResponse){
      res.status(500).json({});
    } else {
      if(serviceResponse.success){
        res.status(200).json(serviceResponse);
        res.send();
      } else {
        let errorCode = serviceResponse.code || 500;
        res.status(errorCode).json(serviceResponse);
      }
    }
  });
};
