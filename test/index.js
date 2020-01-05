"use strict";
const chai = require("chai"),
  assert = chai.assert;

const rootPrefix = "..",
  ProductsListService = require(rootPrefix + '/app/services/ProductList'),
  CartAddService = require(rootPrefix + '/app/services/CartAdd'),
  CartRemoveService = require(rootPrefix + '/app/services/CartRemove'),
  CartValueService = require(rootPrefix + '/app/services/CartValue');


let USER_ID = 100;

function productList() {
  it("test product list", async function () {
    let productListServiceObj = new ProductsListService({}),
      res = await productListServiceObj.perform().catch(function (err) {
      console.log(JSON.stringify(err));
      assert.fail('Get product list testcase failed');
    });
    assert.equal(res.success, true);
  });
  
  it("test product list is not empty", async function () {
    let productListServiceObj = new ProductsListService({}),
      res = await productListServiceObj.perform().catch(function (err) {
        console.log(JSON.stringify(err));
        assert.fail('check product list non zero test case failed');
      });
    assert.notEqual(res.products.length, 0);
  });
}

async function cartAdd() {
  it("test addition in cart", async function () {
    let cartAddServiceObj = new CartAddService({user_id: USER_ID, product_id: 1}),
      res = await cartAddServiceObj.perform().catch(function (err) {
        console.log(JSON.stringify(err));
        assert.fail('cart addition testcase failed');
      });
    assert.equal(res.success, true);
  });
}

async function cartValue() {
  it("test cart value", async function () {
    let cartValueServiceObj = new CartValueService({user_id: USER_ID}),
      res = await cartValueServiceObj.perform().catch(function (err) {
        console.log(JSON.stringify(err));
        assert.fail('cart value testcase failed');
      });
    assert.equal(res.success, true);
  });
}

async function removeFromCart() {
  it("test removal from cart", async function () {
    let cartRemoveServiceObj = new CartRemoveService({user_id: USER_ID, product_id: 1}),
      res = await cartRemoveServiceObj.perform().catch(function (err) {
        console.log(JSON.stringify(err));
        assert.fail('cart removal testcase failed');
      });
    assert.equal(res.success, true);
  });
}


async function testcases() {
  await productList();
  await cartAdd();
  await cartValue();
  await removeFromCart();
}

testcases();
