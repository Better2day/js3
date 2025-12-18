// 둘 중 하나 선택
// const sqlite3 = require('sqlite3');
const bettersqlite3 = require('better-sqlite3');

class Database {
  constructor() {
    this.db = new bettersqlite3('board.db');
  }

  execute(query, params = []) {
    try {
      const statement = this.db.prepare(query);
      const result = statement.run(params);
      return { lastId: result.lastInsertRowid, changes: result.changes };
    } catch (error) {
      throw error;
    }
  }

  // 위와 같은 식으로, 데이터를 받아오는 Query를 나만의 함수로 구현하기
  executeQuery(query, params = []) {
    // 여기에 원하는 내용을 받아서 반환하는 로직
    try {
      const statement = this.db.prepare(query);

      // 전체 조회
      if (params.length == 0) {
        const result = statement.all();
        // console.log(result);
        return result;
      } else { // 조건 조회
        const result = statement.get(params[0]);
        // console.log(result);
        return result;
      }
    } catch (error) {
      throw error;
    }

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
