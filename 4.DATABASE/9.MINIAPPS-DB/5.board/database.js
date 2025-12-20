// 둘 중 하나 선택
// const sqlite3 = require('sqlite3');
const bettersqlite3 = require('better-sqlite3');

class Database {
  constructor() {
    this.db = new bettersqlite3('memo.db');
  }

  // try ~ catch block, prepare method 실행 등 공통 부분 처리 함수
  // execute/all/get 처럼 각각 로직이 다른 것은, 각 함수에서 받은 콜백 함수에 인자를 주고 실행
  doCommon(query, params, callback) {
    try {
      const statement = this.db.prepare(query);
      return callback(statement, params);
    } catch (error) {
      throw error;
    }
  }

  execute(query, params = []) {
    try {
      // const statement = this.db.prepare(query);
      // const result = statement.run(params);
      const result = this.doCommon(query, params, (stmt, params) => stmt.run(params));
      return { lastId: result.lastInsertRowid, changes: result.changes };
    } catch (error) {
      throw error;
    }
  }

  // 전체 조회
  all(query, params = []) {
    // return this.db.prepare(query).all(params);
    return this.doCommon(query, params, (stmt, params) => stmt.all(params));
  }

  get(query, params = []) {
    return this.doCommon(query, params, (stmt, params) => stmt.get(params));
  }

  close() {
    try {
      this.db.close();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Database;
