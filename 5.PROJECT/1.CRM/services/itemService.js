const itemModel = require('../models/itemModel');

// 품목 목록
function getItems({ page }) {
  const items = itemModel.getItems({ page });
  if (!items) {
    throw new Error('Item Not Found');
  }
  return items;
}

function getItemCount() {
  const itemCount = itemModel.getItemCount();
  if (!itemCount) {
    throw new Error('Item Not Found');
  }
  return itemCount;
}

// 품목 상세
function getItemDetail({ id }) {
  const item = itemModel.getItemDetail({ id });
  console.log(item);
  if (!item) {
    throw new Error('Item Not Found');
  }
  return item;
}

module.exports = { getItems, getItemCount, getItemDetail };
