const router = require('express').Router();
const itemController = require('../controllers/itemController');

// 품목 목록 (items)
router.get('/', itemController.getItems);
router.get('/count', itemController.getItemCount);

// 품목 상세 (item-detail)
router.get('/:id', itemController.getItemDetail);

module.exports = router;
