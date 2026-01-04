const orderitemModel = require('../models/orderitemModel');

// 주문별 품목 목록
function getOrderitems({ page }) {
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

// 주문별 품목 상세
function getOrderitemDetail({ id }) {
  console.log('orderitemService.js → getOrderitemDetail() 안');
  const orderitem = orderitemModel.getOrderitemDetail({ id }); // 상점 데이터 페이지 기본값: 첫 페이지
  if (!orderitem) {
    throw new Error('Orderitem Not Found');
  }
  return orderitem;
}

module.exports = { getOrderitems, getOrderitemCount, getOrderitemDetail };
