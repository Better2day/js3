const itemService = require('../services/itemService');

// 품목 목록
function getItems(req, res) {
  const { page } = req.query;

  try {
    const items = itemService.getItems({ page });
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getItemCount(req, res) {
  try {
    const itemCount = itemService.getItemCount();
    res.json(itemCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

// 품목 상세
function getItemDetail(req, res) {
  const { id } = req.params;

  try {
    const item = itemService.getItemDetail({ id });
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getItems, getItemCount, getItemDetail };
