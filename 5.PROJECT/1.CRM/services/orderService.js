const orderModel = require('../models/orderModel');

// 주문 목록
function getOrders({ page }) {
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

// 주문 상세
function getOrderDetail({ id }) {
  console.log('orderService.js → getOrderDetail() 안');
  const order = orderModel.getOrderDetail({ id }); // 상점 데이터 페이지 기본값: 첫 페이지
  if (!order) {
    throw new Error('Order Not Found');
  }
  return order;
}

module.exports = { getOrders, getOrderCount, getOrderDetail };
