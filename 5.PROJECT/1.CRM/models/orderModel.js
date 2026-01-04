const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getOrders({ page = 1 }) {
  console.log('orderModel.js → getOrders() 안');
  console.log('page: ', page);
  // console.log('orderAt: ', orderAt);

  const rows = db.prepare(`
    SELECT *
    FROM orders
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE name LIKE ?
  //   AND orderAt LIKE ?
  //  `).all(`%${name}%`, `${orderAt}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  console.log(rows);

  return rows;
}

function getOrderCount() {
  const { orderCount } = db.prepare(`
    SELECT COUNT(Id) AS orderCount
    FROM orders
    `).get();

  console.log('orderModel.js → getOrderCount() 안');
  console.log('orderCount: ', orderCount);
  return orderCount;
}

module.exports = { getOrders, getOrderCount };
