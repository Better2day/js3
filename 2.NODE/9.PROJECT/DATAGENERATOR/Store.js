// Id,Name,Type,Address
// 6d90b46e-7bab-45e3-ab88-9ff1eb393aee,투썸 강서9호점,투썸,부산 강남구 25로 57
// e687ed96-5716-451d-ba80-75e5d107c2ad,커피빈 신촌5호점,커피빈,부산 강서구 32로 45
// 72a8418b-0f81-4ee7-b57e-b8d9ff7eab73,이디야 잠실9호점,이디야,부산 강남구 74길 79
// 7951a2e8-5384-4132-8d70-0d027f976597,스타벅스 송파9호점,스타벅스,부산 강남구 43로 71
// 0acc9d84-726b-4e53-a27f-883759456f79,커피빈 홍대3호점,커피빈,광주 중구 91길 95
// 6aa4b9b4-b23e-4ade-ad3e-8f47ea76563e,커피빈 잠실10호점,커피빈,서울 서구 84로 1

// 아래와 같은 형태의 무작위 상점 데이터를, 프로그램 실행시 인수로 받은 개수만큼 생성
// 사용법: 명령 프롬프트에서 node Store.js outputQty[, stdout]
// stdout: csv or console. Default: csv

const { randomUUID } = require('node:crypto');
const { getFileInfo } = require('./util/file');
const { processArgs } = require('./util/argument');
const { setCsvWriter, writeCsv } = require('./util/csvWriter');
const { getRandomAddress } = require('./CommonGen/AddressGen');
const { getRandomBrand, getRandomBranch } = require('./StoreGen/storeInfoGen');

const args = process.argv.slice(2);
const { fileName, csvFileName } = getFileInfo(__filename);
// 프로그램 실행시 인자 여부에 따른 사용법 안내, 인자 기본값 설정
processArgs(args, fileName);

// CSV에 출력할 무작위 사용자 데이터 배열
const records = [];

// CSV Writer 패키지에 무작위 사용자 레코드 헤더 설정
const csvWriter = setCsvWriter(csvFileName, [
  { id: 'id', title: 'ID' },
  { id: 'name', title: 'Name' },
  { id: 'type', title: 'Type' },
  { id: 'address', title: 'Address' },
]);

for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const name = getRandomBrand();
  const type = getRandomBranch(name);
  const address = getRandomAddress();

  if (args[1] == 'csv') {
    // 생성된 무작위 사용자 레코드를 사용자 배열에 푸시
    records.push({
      id,
      name,
      type,
      address
    });
  } else if (args[1] == 'console') {
    console.log(`${id},${name},${type},${address}`);
  }
}

// 생성된 무작위 사용자 배열을 CSV 파일로 출력
if (args[1] == 'csv') {
  writeCsv(csvWriter, records, '무작위 사용자');
}
