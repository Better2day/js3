const { getRandomElement } = require('../util/getRandom');
const { readCsv } = require('../util/csvReader');

// OrderItem에 들어갈 무작위 주문 및 품목 ID를 뽑을 ID Pool
let orderIdPool;
let itemIdPool;

// 무작위 ID를 뽑을 ID Pool 생성은 I/O bound 작업이므로 Order.js에서 초기에 한 번만 초기화
async function initializeIdPool() {
  orderIdPool = await getIdPool('order.csv');
  itemIdPool = await getIdPool('item.csv');
  // console.log('ID Pool 초기화 완료');
}

async function getIdPool(filenameToRead) {
  const result = await readCsv(filenameToRead, 'Id');
  return result;
}

function getRandomId(dataType) {
  if (dataType == 'order' && typeof orderIdPool != 'undefined') {
    return getRandomElement(orderIdPool)['Id'];
  }
  if (dataType == 'item' && typeof itemIdPool != 'undefined') {
    return getRandomElement(itemIdPool)['Id'];
  }
}

module.exports = { initializeIdPool, getRandomId };
