const router = require('express').Router();
const storeController = require('../controllers/storeController');

router.get('/', storeController.getStores);
router.get('/count', storeController.getStoreCount);

module.exports = router;
