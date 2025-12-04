const { getRandomInRange, getRandomBetween } = require('../util/getRandom');

// 무작위 성별
function getRandomGender() {
  return getRandomBetween('남성', '여성');
}

// 무작위 나이 (단, 10~59세 사이)
// 배열 인덱스에 매핑해서 연령대에 맞는 이름을 받아오기 위해서 나이 범위에 배열 개수와 비슷한 제한을 뒀다.
function getRandomAge() {
  return getRandomInRange(10, 59);
  // return Math.floor(Math.random() * 50) + 10;
}
// console.log(getRandomAge());

// 나이대 반환 함수 (예. 59면 50(대) 반환)
function getAgeRange(age) {
  return Math.floor(age / 10) * 10;
}

// 무작위 생년월일 (YYYY-MM-DD Date 형)
function getRandomBirthday(age) {
  const today = new Date();
  const year = parseInt(today.getFullYear()) - age;
  const month = getRandomInRange(1, 12).toString().padStart(2, '0');
  const day = getRandomInRange(1, 28).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
// console.log(getRandomBirthday(getRandomAge()));

module.exports = { getRandomGender, getRandomAge, getAgeRange, getRandomBirthday };
