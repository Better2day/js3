// 아래와 같은 형태의 무작위 품목 데이터를, 프로그램 실행시 인수로 받은 개수만큼 생성
// 사용법: 명령 프롬프트에서 node Item.js outputQty[, stdout]
// stdout: csv or console. Default: csv

const { randomUUID } = require('node:crypto');
const { getFileInfo } = require('./util/file');
const { processArgs } = require('./util/argument');
const { setCsvWriter, writeCsv } = require('./util/csvWriter');
const { getRandomItem, getRandomPricePerType } = require('./ItemGen/itemInfoGen');

const args = process.argv.slice(2);
const { fileName, csvFileName } = getFileInfo(__filename);
// 프로그램 실행시 인자 여부에 따른 사용법 안내, 인자 기본값 설정
processArgs(args, fileName);

// CSV에 출력할 무작위 품목 데이터 배열
const records = [];

// CSV Writer 패키지에 무작위 품목 레코드 헤더 설정
const csvWriter = setCsvWriter(csvFileName, [
  { id: 'id', title: 'ID' },
  { id: 'name', title: 'Name' },
  { id: 'type', title: 'Type' },
  { id: 'unitPrice', title: 'UnitPrice' }
]);

for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const { name, type } = getRandomItem();
  const unitPrice = getRandomPricePerType(type);

  if (args[1] == 'csv') {
    // 생성된 무작위 품목 레코드를 품목 배열에 푸시
    records.push({
      id,
      name,
      type,
      unitPrice
    });
  } else if (args[1] == 'console') {
    // console.log(`${id},${name},${type}`);
    console.log(`${id},${name},${type},${unitPrice}`);
  }
}

// 생성된 무작위 품목 배열을 CSV 파일로 출력
if (args[1] == 'csv') {
  writeCsv(csvWriter, records, '무작위 품목');
}
