const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getOrders);
router.get('/count', orderController.getOrderCount);

module.exports = router;
