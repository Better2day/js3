const router = require('express').Router();
const orderitemController = require('../controllers/orderitemController');

router.get('/', orderitemController.getOrderitems);
router.get('/count', orderitemController.getOrderitemCount);

module.exports = router;
