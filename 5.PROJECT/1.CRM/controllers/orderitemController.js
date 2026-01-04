const orderitemService = require('../services/orderitemService');

// 주문별 품목 목록
function getOrderitems(req, res) {
  const { page } = req.query;

  try {
    const orderitems = orderitemService.getOrderitems({ page });
    res.json(orderitems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getOrderitemCount(req, res) {
  try {
    const orderitemCount = orderitemService.getOrderitemCount();
    res.json(orderitemCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

// 주문별 품목 상세
function getOrderitemDetail(req, res) {
  const { id } = req.params;

  try {
    const orderitem = orderitemService.getOrderitemDetail({ id });
    res.json(orderitem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getOrderitems, getOrderitemCount, getOrderitemDetail };
