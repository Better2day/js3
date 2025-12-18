const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

// function connectDB(dbname);

// function runQuery(query, params = []) {
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, err => {
      if (err) return reject(err);
      resolve(this); // this: Statement      
      // db.run이 내부적으로 실행한 결과를 담아서 Promise 외부로 반환
      // this에 바인딩되어 있는 것은 Statemnt 클래스를 상속한 RunResult 클래스 객체로
      // lastID: number, changes : number 형태의 속성을 가지고 있다.
    });
  });
}

function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getQuery() { }

function eachQuery() { }

module.exports = { runQuery, allQuery };
