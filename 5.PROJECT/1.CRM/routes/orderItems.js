const router = require('express').Router();
const orderitemController = require('../controllers/orderitemController');

// 주문별 품목 목록 (orderitems)
router.get('/', orderitemController.getOrderitems);
router.get('/count', orderitemController.getOrderitemCount);

// 주문별 품목 상세 (orderitem-detail)
router.get('/:id', orderitemController.getOrderitemDetail);

module.exports = router;
