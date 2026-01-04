const orderitemService = require('../services/orderitemService');

function getOrderitems(req, res) {
  const { page } = req.query;
  // 검색 기능 추가할 경우 필요
  // const orderId = decodeURIComponent(req.query.orderId);

  console.log('orderitemController.js → getOrderitems() 안');
  console.log('page: ', page);
  // console.log('orderId: ', orderId);

  try {
    const orderitems = orderitemService.getOrderitems({ page });
    res.json(orderitems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getOrderitemCount(req, res) {
  // const orderId = decodeURIComponent(req.query.orderId);

  console.log('orderitemController.js → getOrderitemCount() 안');

  try {
    const orderitemCount = orderitemService.getOrderitemCount();
    res.json(orderitemCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getOrderitems, getOrderitemCount };
