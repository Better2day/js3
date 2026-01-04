const router = require('express').Router();
const storeController = require('../controllers/storeController');

// 상점 목록 (stores)
router.get('/', storeController.getStores);
router.get('/count', storeController.getStoreCount);

// 상점 상세 (store-detail)
router.get('/:id', storeController.getStoreDetail);

module.exports = router;
