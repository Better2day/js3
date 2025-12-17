const sqlite = require('better-sqlite3');

const db = sqlite('simple.db');

db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)');

// prepared statement 를 통해서 SQL Injection을 방어한다.
// 데이터 부분을 하드코딩하지 않고 placeholder를 만들어놓은 다음에
const insert = db.prepare('INSERT INTO users VALUES (?, ?)');
// placeholder에 데이터를 넣어서 실행
const result = insert.run('u001', 'user1');
console.log('삽입 완료: ', result);

// 조회
const userId = 'u001'; // 조회활 아이디

const select = db.prepare('SELECT * FROM users WHERE id = ?');
const result2 = select.get(userId);
// console.log('조회 결과: ', result2.firstName, result2.lastName, result2.email);
console.log('조회 결과: ', result2);
