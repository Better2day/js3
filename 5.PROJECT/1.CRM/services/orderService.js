const orderModel = require('../models/orderModel');

function getOrders({ page }) {
  // console.log('orderService.js → getOrders() 안');
  // console.log('page: ', page);

  // 검색 기능 추가할 경우 필요
  // console.log('orderAt: ', orderAt);

  const orders = orderModel.getOrders({ page }); // 상점 데이터 페이지 기본값: 첫 페이지
  if (!orders) {
    throw new Error('Order Not Found');
  }
  return orders;
}

function getOrderCount() {
  const orderCount = orderModel.getOrderCount();
  if (!orderCount) {
    throw new Error('Order Not Found');
  }
  return orderCount;
}

module.exports = { getOrders, getOrderCount };
