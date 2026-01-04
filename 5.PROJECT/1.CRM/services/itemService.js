const itemModel = require('../models/itemModel');

// 품목 목록
function getItems({ page }) {
  const items = itemModel.getItems({ page }); // 상점 데이터 페이지 기본값: 첫 페이지
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
  console.log('itemService.js → getItemDetail() 안');
  const item = itemModel.getItemDetail({ id }); // 상점 데이터 페이지 기본값: 첫 페이지
  console.log(item);
  if (!item) {
    throw new Error('Item Not Found');
  }
  return item;
}

module.exports = { getItems, getItemCount, getItemDetail };
