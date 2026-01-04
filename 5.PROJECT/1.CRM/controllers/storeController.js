const storeService = require('../services/storeService');

// 상점 목록
function getStores(req, res) {
  const { page } = req.query;

  try {
    const stores = storeService.getStores({ page });
    res.json(stores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getStoreCount(req, res) {
  try {
    const storeCount = storeService.getStoreCount();
    res.json(storeCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

// 상점 상세
function getStoreDetail(req, res) {
  const id = decodeURIComponent(req.params.id);
  console.log('usreController.js → getStoreDetail() 안. id: ', id);

  try {
    const store = storeService.getStoreDetail({ id });
    res.json(store);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getStores, getStoreCount, getStoreDetail };
