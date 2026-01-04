const storeModel = require('../models/storeModel');

// 상점 목록
function getStores({ page }) {
  const stores = storeModel.getStores({ page });
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

// 상점 상세
function getStoreDetail({ id }) {
  const store = storeModel.getStoreDetail({ id });
  if (!store) {
    throw new Error('Store Not Found');
  }
  return store;
}

module.exports = { getStores, getStoreCount, getStoreDetail };
