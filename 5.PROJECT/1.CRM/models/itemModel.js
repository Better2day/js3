const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getItems({ page = 1 }) {
  console.log('itemModel.js → getItems() 안');
  console.log('page: ', page);
  // console.log('name: ', name);
  // console.log('address: ', address);

  const rows = db.prepare(`
    SELECT *
    FROM items
    LIMIT ?
    OFFSET ?
    `).all(PAGE_SIZE, (page - 1) * PAGE_SIZE);

  // 검색 기능 추가할 경우 필요
  // WHERE name LIKE ?
  //   AND address LIKE ?
  //  `).all(`%${name}%`, `${address}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  console.log(rows);

  return rows;
}

function getItemCount() {
  const { itemCount } = db.prepare(`
    SELECT COUNT(Id) AS itemCount
    FROM items
    `).get();

  console.log('itemModel.js → getItemCount() 안');
  console.log('itemCount: ', itemCount);
  return itemCount;
}

module.exports = { getItems, getItemCount };
