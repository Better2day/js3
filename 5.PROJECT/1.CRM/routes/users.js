const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/count', userController.getUserCount);

module.exports = router;
