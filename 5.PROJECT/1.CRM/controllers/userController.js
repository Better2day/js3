const userService = require('../services/userService');

function getUsers(req, res) {
  const { page } = req.query;
  // const name = decodeURIComponent(req.query.name);
  // const gender = decodeURIComponent(req.query.gender);
  const name = req.query.name;
  const gender = req.query.gender;
  // page = page ?? 1;
  // 널 병합 불가능. page 값이 FE에서는 null이었지만, req.query 구조 분해 할당 과정에서 문자열로 변환되서 'null'이 된다.
  // → 널 병합을 이용해서 기본값을 설정하고 싶으면 FE .js 파일에서 처리해야 한다.
  console.log('usreController.js → getUsers() 안');
  console.log('page: ', page);
  console.log('name: ', name);
  console.log('gender: ', gender);

  try {
    const users = userService.getUsers({ name, gender, page });
    res.json(users);
  } catch (err) {
    console.log(err);
    // res.status(500).send('Server error: ', err); // send로 하면 Front-end Promise.all()에서 오류 발생
    res.status(500).json({ 'Server error': err });
  }
}

function getUserCount(req, res) {
  // const { name, gender } = req.query;
  // const name = decodeURIComponent(req.query.name);
  // const gender = decodeURIComponent(req.query.gender);
  const name = req.query.name;
  const gender = req.query.gender;
  console.log('usreController.js → getUserCount() 안');
  console.log('name: ', name);
  console.log('gender: ', gender);

  try {
    const userCount = userService.getUserCount({ name, gender });
    res.json(userCount);
  } catch (err) {
    console.log(err);
    // res.status(500).send('Server error: ', err);
    res.status(500).json({ 'Server error': err });
  }
}

module.exports = { getUsers, getUserCount };
