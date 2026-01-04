const orderService = require('../services/orderService');

// 주문 목록
function getOrders(req, res) {
  const { page } = req.query;

  try {
    const orders = orderService.getOrders({ page });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getOrderCount(req, res) {
  try {
    const orderCount = orderService.getOrderCount();
    res.json(orderCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

// 주문 상세
function getOrderDetail(req, res) {
  const { id } = req.params;

  try {
    const order = orderService.getOrderDetail({ id });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

// 특정 사용자 주문 목록
function getOrdersForUser(req, res) {
  const { id: userId } = req.params;

  try {
    const orders = orderService.getOrdersForUser({ userId });
    return orders;
  } catch (err) {
    console.log(err);
    throw new Error({ 'Server error': err });
  }
}

module.exports = { getOrders, getOrderCount, getOrderDetail, getOrdersForUser };
