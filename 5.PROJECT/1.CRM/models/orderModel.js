const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

// 주문 목록
function getOrders({ page = 1 }) {
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

  return rows;
}

function getOrderCount() {
  const { orderCount } = db.prepare(`
      SELECT COUNT(Id) AS orderCount
      FROM orders
      `).get();

  return orderCount;
}

// 주문 상세
function getOrderDetail({ id }) {
  console.log('orderModel.js → getOrderDetail() 안');

  const row = db.prepare(`
    SELECT *
    FROM orders
    WHERE Id = ?
    `).get(id);

  console.log(row);
  return row;
}

// 특정 사용자 주문 목록
function getOrdersForUser({ userId }) {
  const rows = db.prepare(`
    SELECT Id AS orderId, OrderAt, StoreId
    FROM orders
    WHERE userId = ?
    `).all(userId);

  console.log(rows);
  return rows;
}

module.exports = { getOrders, getOrderCount, getOrderDetail, getOrdersForUser };
