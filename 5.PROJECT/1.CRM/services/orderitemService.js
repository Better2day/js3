const orderitemModel = require('../models/orderitemModel');

function getOrderitems({ page }) {
  console.log('orderitemService.js → getOrderitems() 안');
  console.log('page: ', page);

  // 검색 기능 추가할 경우 필요
  // console.log('orderId: ', orderId);

  const orderitems = orderitemModel.getOrderitems({ page }); // 상점 데이터 페이지 기본값: 첫 페이지
  if (!orderitems) {
    throw new Error('Orderitem Not Found');
  }
  return orderitems;
}

function getOrderitemCount() {
  const orderitemCount = orderitemModel.getOrderitemCount();
  if (!orderitemCount) {
    throw new Error('Orderitem Not Found');
  }
  return orderitemCount;
}

module.exports = { getOrderitems, getOrderitemCount };
