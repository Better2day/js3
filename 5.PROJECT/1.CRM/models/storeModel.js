const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getStores({ page = 1 }) {
  console.log('storeModel.js → getStores() 안');
  console.log('page: ', page);
  // console.log('name: ', name);
  // console.log('address: ', address);

  const rows = db.prepare(`
    SELECT *
    FROM stores
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

function getStoreCount() {
  const { storeCount } = db.prepare(`
    SELECT COUNT(Id) AS storeCount
    FROM stores
    `).get();

  console.log('storeModel.js → getStoreCount() 안');
  console.log('storeCount: ', storeCount);
  return storeCount;
}

module.exports = { getStores, getStoreCount };
