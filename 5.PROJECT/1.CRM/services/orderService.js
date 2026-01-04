const orderModel = require('../models/orderModel');

// 주문 목록
function getOrders({ page }) {
  const orders = orderModel.getOrders({ page });
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
  const order = orderModel.getOrderDetail({ id });
  if (!order) {
    throw new Error('Order Not Found');
  }
  return order;
}

// 특정 사용자 주문 목록
function getOrdersForUser({ userId }) {
  const orders = orderModel.getOrdersForUser({ userId });
  if (!orders) {
    throw new Error('Order Not Found');
  }
  return orders;
}

module.exports = { getOrders, getOrderCount, getOrderDetail, getOrdersForUser };
