const itemModel = require('../models/itemModel');

function getItems({ page }) {
  console.log('itemService.js → getItems() 안');
  console.log('page: ', page);

  // 검색 기능 추가할 경우 필요
  // console.log('name: ', name);
  // console.log('address: ', address);

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

module.exports = { getItems, getItemCount };
