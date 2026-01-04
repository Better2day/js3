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
  const id = decodeURIComponent(req.params.id);
  console.log('orderController.js → getOrderDetail() 안. id: ', id);

  try {
    const order = orderService.getOrderDetail({ id });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getOrders, getOrderCount, getOrderDetail };
