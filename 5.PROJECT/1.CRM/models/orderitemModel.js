const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

// 주문별 품목 목록
function getOrderitems({ page = 1 }) {
  const rows = db.prepare(`
    SELECT *
    FROM orderitems
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE orderId = ?
  //  `).all(`${orderId}`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  return rows;
}

function getOrderitemCount() {
  const { orderitemCount } = db.prepare(`
    SELECT COUNT(Id) AS orderitemCount
    FROM orderitems
    `).get();

  return orderitemCount;
}

// 주문별 품목 상세
function getOrderitemDetail({ id }) {
  console.log('orderitemModel.js → getOrderitemDetail() 안');

  const row = db.prepare(`
    SELECT *
    FROM orderitems
    WHERE Id = ?
    `).get(id);

  console.log(row);
  return row;
}

module.exports = { getOrderitems, getOrderitemCount, getOrderitemDetail };
