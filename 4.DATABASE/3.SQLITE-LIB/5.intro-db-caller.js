const { runQuery, allQuery } = require('./5.intro-db-library');

async function doDbWorking() {
  await runQuery('CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)');
  console.log('테이블이 성공적으로 생성되었습니다');

  // 데이터 삽입
  await runQuery('INSERT INTO users VALUES ("id001", "user1")');
  console.log('테이블이 성공적으로 삽입되었습니다');

  const rows = await allQuery('SELECT * FROM users');
  console.log('조회가 성공했습니다');
  rows.forEach(row => console.log('조회된 메시지: ', row));
}

doDbWorking();
