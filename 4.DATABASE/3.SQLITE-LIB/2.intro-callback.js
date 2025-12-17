const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

db.run('CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)', (err) => {
  if (err) {
    return console.error('테이블 생성 오류입니다');
  }
  // 에러가 없으면 
  db.run('INSERT INTO users VALUES ("id001", "user1")', err => {
    if (err) {
      return console.error('데이터 삽입에 실패했습니다.');
    }
    // INSERT 문이 성공했으면 (callback hell)
    db.each('SELECT * FROM users', (err, row) => {
      if (err) {
        return console.error('데이터를 가져오는데 실패했습니다.');
      }
      console.log('조회된 메시지: ', row);
    })

    // 조회가 완료된 다음에 닫아야 함
    db.close();
  });

})
