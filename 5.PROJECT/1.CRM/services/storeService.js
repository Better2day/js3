const storeModel = require('../models/storeModel');

function getStores({ page }) {
  console.log('storeService.js → getStores() 안');
  console.log('page: ', page);

  // 검색 기능 추가할 경우 필요
  // console.log('name: ', name);
  // console.log('address: ', address);

  const stores = storeModel.getStores({ page }); // 상점 데이터 페이지 기본값: 첫 페이지
  if (!stores) {
    throw new Error('Store Not Found');
  }
  return stores;
}

function getStoreCount() {
  const storeCount = storeModel.getStoreCount();
  if (!storeCount) {
    throw new Error('Store Not Found');
  }
  return storeCount;
}

module.exports = { getStores, getStoreCount };
