const storeService = require('../services/storeService');

function getStores(req, res) {
  const { page } = req.query;
  // 검색 기능 추가할 경우 필요
  // const name = decodeURIComponent(req.query.name);
  // const address = decodeURIComponent(req.query.address);

  console.log('usreController.js → getStores() 안');
  console.log('page: ', page);
  // console.log('name: ', name);
  // console.log('address: ', address);

  try {
    const stores = storeService.getStores({ page });
    res.json(stores);
  } catch (err) {
    console.log(err);
    // res.status(500).send('Server error: ', err); // send로 하면 Front-end Promise.all()에서 오류 발생
    res.status(500).json({ 'Server error': err });
  }
}

function getStoreCount(req, res) {
  // const name = decodeURIComponent(req.query.name);
  // const address = decodeURIComponent(req.query.address);

  console.log('usreController.js → getStoreCount() 안');

  try {
    const storeCount = storeService.getStoreCount();
    res.json(storeCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getStores, getStoreCount };
