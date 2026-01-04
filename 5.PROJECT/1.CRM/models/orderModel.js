const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getOrders({ page = 1 }) {
  // console.log('orderModel.js → getOrders() 안');
  // console.log('page: ', page);
  // console.log('orderAt: ', orderAt);

  const rows = db.prepare(`
    SELECT *
    FROM orders
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE orderAt = ?
  //  `).all(`${orderAt}`, PAGE_SIZE, (page - 1) * PAGE_SIZE);
  // 시간으로 검색하려면 strftime() 함수를 이용하여
  // 연도 또는 연월 식으로 변환해서 대소 비교, 범위 검색 등을 만들어야 할 듯

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
