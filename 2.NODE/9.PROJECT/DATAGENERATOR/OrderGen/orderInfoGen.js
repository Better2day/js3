const { getRandomElement, getRandomInRange } = require('../util/getRandom');
const { readCsv } = require('../util/csvReader');

// Order에 들어갈 무작위 상점 및 사용자 ID를 뽑을 ID Pool
let userIdPool;
let storeIdPool;

// 무작위 ID를 뽑을 ID Pool 생성은 I/O bound 작업이므로 Order.js에서 초기에 한 번만 초기화
async function initializeIdPool() {
  userIdPool = await getUserIdPool('user.csv');
  storeIdPool = await getStoreIdPool('store.csv');
  // console.log('ID Pool 초기화 완료');
}

async function getUserIdPool(filenameToRead) {
  // readCsv('store.csv', 'ID', 'Address');
  const result = await readCsv(filenameToRead, 'ID');
  return result;
}

async function getStoreIdPool(filenameToRead) {
  const result = await readCsv(filenameToRead, 'ID');
  return result;
}

function getRandomDatetime(yearStart, yearEnd) {
  const year = getRandomInRange(yearStart, yearEnd);
  const month = getRandomInRange(1, 12).toString().padStart(2, '0');
  const day = getRandomInRange(1, 28).toString().padStart(2, '0');
  const hour = getRandomInRange(9, 22).toString().padStart(2, '0'); // 09~23시까지만 운영
  const min = getRandomInRange(0, 59).toString().padStart(2, '0');
  const sec = getRandomInRange(0, 59).toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

function getRandomStoreId() {
  if (typeof storeIdPool != 'undefined') {
    return getRandomElement(storeIdPool)['ID'];
    // return getRandomElement(storeIdPool).ID;
  }
}

function getRandomUserId() {
  if (typeof userIdPool != 'undefined') {
    return getRandomElement(userIdPool)['ID'];
    // return getRandomElement(storeIdPool).ID;
  }
}

module.exports = { initializeIdPool, getRandomDatetime, getRandomStoreId, getRandomUserId };
