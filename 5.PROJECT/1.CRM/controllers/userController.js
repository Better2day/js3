const userService = require('../services/userService');

// 사용자 목록
function getUsers(req, res) {
  const { page } = req.query;
  const name = decodeURIComponent(req.query.name);
  const gender = decodeURIComponent(req.query.gender);
  // page = page ?? 1;
  // 널 병합 불가능. page 값이 FE에서는 null이었지만, req.query 구조 분해 할당 과정에서 문자열로 변환되서 'null'이 된다.
  // → 널 병합을 이용해서 기본값을 설정하고 싶으면 FE .js 파일에서 처리해야 한다.

  try {
    const users = userService.getUsers({ name, gender, page });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

function getUserCount(req, res) {
  const name = decodeURIComponent(req.query.name);
  const gender = decodeURIComponent(req.query.gender);

  try {
    const userCount = userService.getUserCount({ name, gender });
    res.json(userCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

// 사용자 상세
function getUserDetail(req, res) {
  const id = decodeURIComponent(req.params.id);
  console.log('userController.js → getUserDetail() 안. id: ', id);

  try {
    const user = userService.getUserDetail({ id });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getUsers, getUserCount, getUserDetail };
