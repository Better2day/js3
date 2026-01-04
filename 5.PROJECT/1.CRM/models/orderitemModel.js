const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getOrderitems({ page = 1 }) {
  console.log('orderitemModel.js → getOrderitems() 안');
  console.log('page: ', page);
  // console.log('orderId: ', orderId);

  const rows = db.prepare(`
    SELECT *
    FROM orderitems
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE orderId = ?
  //  `).all(`${orderId}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  console.log(rows);

  return rows;
}

function getOrderitemCount() {
  const { orderitemCount } = db.prepare(`
    SELECT COUNT(Id) AS orderitemCount
    FROM orderitems
    `).get();

  console.log('orderitemModel.js → getOrderitemCount() 안');
  console.log('orderitemCount: ', orderitemCount);
  return orderitemCount;
}

module.exports = { getOrderitems, getOrderitemCount };
