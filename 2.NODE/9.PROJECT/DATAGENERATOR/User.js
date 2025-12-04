// 아래와 같은 형태의 무작위 사용자 데이터를, 프로그램 실행시 인수로 받은 개수만큼 생성
// 사용법: 명령 프롬프트에서 node 1.user-generator.js 10

// Id,Name,Gender,Age,Birthdate,Address
// 3e00736a-5978-48ee-9aa9-366b0c4ed0b8,장승현,Female,43,1979-11-05,서울 강남구 88길 78
// 0a234508-1a52-4339-9e49-9c3dcf3d8d33,장은지,Female,37,1985-12-25,광주 서구 31길 41
// → UUID, Name, Gender, Age, Birthday, Address 형태

const { randomUUID } = require('node:crypto');

// const { getRandomInRange, getRandomIndex, getRandomBetween } = require('./util/getRandom');
const { getRandomGender, getRandomAge, getRandomBirthday } = require('./UserGen/userInfoGen');
const { getRandomName } = require('./UserGen/userNameGen');
const { getRandomAddress } = require('./CommonGen/AddressGen');

// 0a234508-1a52-4339-9e49-9c3dcf3d8d33,장은지,Female,37,1985-12-25,광주 서구 31길 41
// → UUID, Name, Gender, Age, Birthday, Address 형태
const args = process.argv.slice(2);
const records = [];

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'user.csv',
  header: [
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'Name' },
    { id: 'gender', title: 'Gender' },
    { id: 'age', title: 'Age' },
    { id: 'birthdate', title: 'Birthdate' },
    { id: 'address', title: 'Address' },
  ]
});

for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const gender = getRandomGender();
  const age = getRandomAge();
  const birthdate = getRandomBirthday(age);
  const name = getRandomName(gender, age);
  const address = getRandomAddress();
  // console.log(`${id},${name},${gender},${age},${birthdate},${address}`);
}

startTime = new Date();
// ※ for문 콘솔 출력용과 CSV 출력용이 중복
// 무작위 사용자 생성 반복문은 공통으로 사용하고, 출력 매체만 조건에 맞게 선택해주면 된다.
// 다만, 대량 데이터 출력을 위해서 순환문을 여러 번 반복할 때 그 안에 조건문이 들어가면 느려지지 않을까 실험 필요
// 만약 그렇다면 for 문이 2번 중복되어서 소스코드가 몇 줄 길어지더라도 조건문으로 실행할 for 문을 결정하는 게 낫겠다.
for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const gender = getRandomGender();
  const age = getRandomAge();
  const birthdate = getRandomBirthday(age);
  const name = getRandomName(gender, age);
  const address = getRandomAddress();
  if (args[1] == 'csv') {
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
  }
}
// csvWriter.writeRecords(records) // returns a promise
//   .then(() => {
//     console.log('무작위 사용자 엑셀 파일 작성 완료');
//   });
endTime = new Date();
console.log(endTime - startTime);