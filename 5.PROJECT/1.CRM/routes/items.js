const router = require('express').Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.get('/count', itemController.getItemCount);

module.exports = router;
