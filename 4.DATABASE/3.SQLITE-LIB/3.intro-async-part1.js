const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

// async function doDb-notWorking() {
//   // await가 기다릴 수 있는 대상은?
//   // 내가 일을 시킨 애가 일관된 방법으로 자신의 진행상황을 알려줄 수 있을 때
//   // 진행상황을 알려주는 애 Promise라는 형태(객체)로 상태를 알려주고
//   // pending, fulfilled, rejected
//   const result = await db.run('CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)');
//   const result2 = await db.run('INSERT INTO users VALUES ("id001", "user1")');
// };

// doDb-notWorking();

async function doDbWorking() {
  await new Promise((resolve, reject) => {
    db.run('CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)', err => {
      if (err) reject(err);
      else resolve();
    });
  });
  console.log('테이블이 성공적으로 생성되었습니다');

  // 데이터 삽입
  await new Promise((resolve, reject) => {
    db.run('INSERT INTO users VALUES ("id001", "user1")', err => {
      if (err) reject(err);
      else resolve();
    });
    console.log('테이블이 성공적으로 삽입되었습니다');
  });

  const rows = await new Promise((resolve, reject) => {
    // const results = [];
    // db.each('SELECT * FROM users', (err, row) => {
    //   if (err) reject(err);
    //   else results.push(row);
    // }, err => {
    //   if (err) reject(err);
    //   else resolve(results);
    // });

    db.all('SELECT * FROM users', (err, rows) => {
      if (err) reject(err)
      else resolve(rows);
    });
  });

  console.log('조회가 성공했습니다');
  rows.forEach(row => console.log('조회된 메시지: ', row));
}

doDbWorking();
