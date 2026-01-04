const itemService = require('../services/itemService');

function getItems(req, res) {
  const { page } = req.query;
  // 검색 기능 추가할 경우 필요
  // const name = decodeURIComponent(req.query.name);

  console.log('itemController.js → getItems() 안');
  console.log('page: ', page);
  // console.log('name: ', name);

  try {
    const items = itemService.getItems({ page });
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getItemCount(req, res) {
  // const name = decodeURIComponent(req.query.name);

  console.log('itemController.js → getItemCount() 안');

  try {
    const itemCount = itemService.getItemCount();
    res.json(itemCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getItems, getItemCount };
