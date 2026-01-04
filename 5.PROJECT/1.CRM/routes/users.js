const router = require('express').Router();
const userController = require('../controllers/userController');

// 사용자 목록 (users)
router.get('/', userController.getUsers);
router.get('/count', userController.getUserCount);

// 사용자 상세 (user-detail)
router.get('/:id', userController.getUserDetail);

module.exports = router;
