const orderitemModel = require('../models/orderitemModel');

// 주문별 품목 목록
function getOrderitems({ page }) {
  const orderitems = orderitemModel.getOrderitems({ page });
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
  const orderitem = orderitemModel.getOrderitemDetail({ id });
  if (!orderitem) {
    throw new Error('Orderitem Not Found');
  }
  return orderitem;
}

module.exports = { getOrderitems, getOrderitemCount, getOrderitemDetail };
