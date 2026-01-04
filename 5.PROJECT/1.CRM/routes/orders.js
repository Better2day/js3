const router = require('express').Router();
const orderController = require('../controllers/orderController');

// 주문 목록
router.get('/', orderController.getOrders);
router.get('/count', orderController.getOrderCount);

// 주문 상세
router.get('/:id', orderController.getOrderDetail);

module.exports = router;
