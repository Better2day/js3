const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

// 상점 목록
function getStores({ page = 1 }) {
  const rows = db.prepare(`
    SELECT *
    FROM stores
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE name LIKE ?
  //   AND address LIKE ?
  //  `).all(`%${name}%`, `%${address}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  return rows;
}

function getStoreCount() {
  const { storeCount } = db.prepare(`
    SELECT COUNT(Id) AS storeCount
    FROM stores
    `).get();

  return storeCount;
}

// 상점 상세
function getStoreDetail({ id }) {
  console.log('storeModel.js → getStoreDetail() 안');

  const row = db.prepare(`
    SELECT *
    FROM stores
    WHERE Id = ?
    `).get(id);

  console.log(row);
  return row;
}

module.exports = { getStores, getStoreCount, getStoreDetail };
