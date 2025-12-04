// 아래와 같은 형태의 무작위 사용자 데이터를, 프로그램 실행시 인수로 받은 개수만큼 생성
// 사용법: 명령 프롬프트에서 node 1.user-generator.js 10

const { randomUUID } = require('node:crypto');
const { getRandomGender, getRandomAge, getRandomBirthday } = require('./UserGen/userInfoGen');
const { getRandomName } = require('./UserGen/userNameGen');
const { getRandomAddress } = require('./CommonGen/AddressGen');
const { setCsvWriter, writeCsv } = require('./util/csvWriter');

const args = process.argv.slice(2);
const records = [];

// CSV Writer 패키지에 무작위 사용자 레코드 헤더 설정
const csvWriter = setCsvWriter('user.csv', [
  { id: 'id', title: 'ID' },
  { id: 'name', title: 'Name' },
  { id: 'gender', title: 'Gender' },
  { id: 'age', title: 'Age' },
  { id: 'birthdate', title: 'Birthdate' },
  { id: 'address', title: 'Address' },
]);

for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const gender = getRandomGender();
  const age = getRandomAge();
  const birthdate = getRandomBirthday(age);
  const name = getRandomName(gender, age);
  const address = getRandomAddress();
  if (args[1] == 'csv') {
    // 생성된 무작위 사용자 레코드를 사용자 배열에 푸시
    records.push({
      id,
      name,
      gender,
      age,
      birthdate,
      address
    });
  } else if (args[1] == 'console') {
    console.log(`${id},${name},${gender},${age},${birthdate},${address}`);
  } else {
    console.log('두 번째 인자에 올바른 출력 매체명을 입력해주세요: console or csv');
    break;
  }
}

// 생성된 무작위 사용자 배열을 CSV 파일로 출력
if (args[1] == 'csv') {
  writeCsv(csvWriter, records, '무작위 사용자');
}
