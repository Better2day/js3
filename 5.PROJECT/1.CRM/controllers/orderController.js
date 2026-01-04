const orderService = require('../services/orderService');

function getOrders(req, res) {
  const { page } = req.query;
  // 검색 기능 추가할 경우 필요
  // const orderAt = decodeURIComponent(req.query.orderAt);

  console.log('orderController.js → getOrders() 안');
  console.log('page: ', page);
  // console.log('orderAt: ', orderAt);

  try {
    const orders = orderService.getOrders({ page });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getOrderCount(req, res) {
  // const orderAt = decodeURIComponent(req.query.orderAt);

  console.log('orderController.js → getOrderCount() 안');

  try {
    const orderCount = orderService.getOrderCount();
    res.json(orderCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getOrders, getOrderCount };
