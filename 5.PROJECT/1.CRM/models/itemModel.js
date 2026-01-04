const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

// 품목 목록
function getItems({ page = 1 }) {
  const rows = db.prepare(`
    SELECT *
    FROM items
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE name LIKE ?
  //  `).all(`%${name}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  return rows;
}

function getItemCount() {
  const { itemCount } = db.prepare(`
    SELECT COUNT(Id) AS itemCount
    FROM items
    `).get();

  return itemCount;
}

// 품목 상세
function getItemDetail({ id }) {
  console.log('itemModel.js → getItemDetail() 안');

  const row = db.prepare(`
    SELECT *
    FROM items
    WHERE Id = ?
    `).get(id);

  console.log(row);
  return row;
}

module.exports = { getItems, getItemCount, getItemDetail };
