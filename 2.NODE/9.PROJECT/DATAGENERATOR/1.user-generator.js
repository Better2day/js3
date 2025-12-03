// 아래와 같은 형태의 무작위 사용자 데이터를, 프로그램 실행시 인수로 받은 개수만큼 생성
// 사용법: 명령 프롬프트에서 node 1.user-generator.js 10

// Id,Name,Gender,Age,Birthdate,Address
// 3e00736a-5978-48ee-9aa9-366b0c4ed0b8,장승현,Female,43,1979-11-05,서울 강남구 88길 78
// 0a234508-1a52-4339-9e49-9c3dcf3d8d33,장은지,Female,37,1985-12-25,광주 서구 31길 41
// → UUID, Name, Gender, Age, Birthday, Address 형태

const { randomUUID } = require('node:crypto');

// 범위 내에서 무작위 숫자를 추출해서 반환 (일단 양의 정수만 처리. rangeStart < rangeEnd 이어야 함)
// ※ 추후 시간 있으면 rangeStart > rangeEnd인 값이 들어왔을 때, 스왑해서 처리하도록 하면 좋겠다.
// 인수로 rangeStart, rangeEnd를 넣으면, rangeStart ~ rangeEnd 사이 무작위 숫자 반환
function getRandomInRange(rangeStart, rangeEnd) {
  const rangeSize = rangeEnd - rangeStart + 1;
  let num;
  // undefined인지 확인할 때는 typeof 변수명 === 'undefined' 또는 변수명 === undefined 중 하나를 사용해야 한다.
  // 전자(typeof 이용 방식)이 변수가 선언되어 있지 않은 경우에도 오류가 발생하지 않아서 더 낫다.
  // ※ typeof는 결과값을 문자열로 반환하기 때문에 typeof 변수명 === undefined는 false로 나온다.
  if (typeof rangeStart === 'undefined' || typeof rangeEnd === 'undefined') {
    console.log('Function usage: getRandomInRange(rangeStart, rangeEnd)');
    return -1;
  }
  if (rangeStart < 0 || rangeEnd < 0) {
    console.log('인자에는 0 또는 양의 정수만 넣으세요');
    return -1;
  }
  if (rangeStart == rangeEnd) {
    console.log('범위 시작 값과 끝 값이 같습니다. 같은 숫자를 뽑는 건 랜덤이 아니므로 종료합니다.');
    return -1;
  }

  return Math.floor(Math.random() * rangeSize) + rangeStart;
}

// 배열 크기를 넣으면 그 안에서 무작위 인덱스 추출
function getRandomIndex(arraySize) {
  return Math.floor(Math.random() * arraySize);
}

// 인자 둘 중의 하나를 무작위로 선택하여 반환
function getRandomBetween(param1, param2) {
  return Math.random() > 0.5 ? param1 : param2;
}


// 무작위 성별
function getRandomGender() {
  return getRandomBetween('Male', 'Female');
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

// 무작위 이름 (다만, 남자, 여자 이름 분리. 무작위로 얻은 성별 및 나이대에 어울리는 이름 선택)
function getRandomName(gender, age) {
  const familyNames = [
    '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권',
    '황', '안', '송', '전', '홍', '유', '고', '문', '양', '손', '배', '조', '백', '허', '유',
    '남', '심', '노', '정', '하', '곽', '성', '차', '주', '우', '구', '신', '임', '전', '민',
    '유', '류', '나', '진', '지', '엄', '채', '원', '천', '방', '공', '강', '현', '함', '변',
    '염', '양', '변', '여', '추', '노', '도', '소', '신', '석', '선', '설', '마', '길', '주',
    '연', '방', '위', '표', '명', '기', '반', '라', '왕', '금', '옥', '육', '인', '맹', '제',
    '모', '장', '탁', '국', '여', '진'
  ];

  // 남녀 각각 태어난 시대별로 가장 많이 사용한 이름 10개씩
  // 현재가 2025년이라서 인덱스 처리를 위해서 아래 년대 조절 (각각 5년씩 당김)
  const maleNames = [
    '주호', '민규', '하람', '태경', '찬민', '지율', '건호', '도윤', '찬우', '지오', // 10대. 2006년~ 
    '서준', '예준', '하준', '지민', '태윤', '유준', '준우', '윤호', '시우', '건우', // 20대. 1996년~
    '민준', '지호', '현우', '진우', '유민', '승민', '태석', '영진', '성훈', '주영', // 30대. 1986년~ 
    '준호', '태훈', '정수', '재민', '영호', '상훈', '영재', '형준', '도현', '수혁', // 40대. 1976년~ 
    '민수', '영수', '성민', '지훈', '현수', '승규', '동현', '철수', '진수', '재훈'  // 50대. 1966년~ 
  ];

  const femaleNames = [
    '민서', '지유', '유나', '수아', '다영', '지아', '예원', '소율', '가은', '나은', // 10대
    '서연', '서현', '지민', '하은', '주은', '민지', '채원', '하영', '윤아', '지우', // 20대
    '연수', '미영', '보람', '미정', '예진', '시은', '지선', '현경', '소희', '주희', // 30대
    '주미', '지현', '은영', '수현', '혜진', '소영', '정민', '윤정', '선영', '선희', // 40대
    '영희', '지영', '지혜', '은정', '지은', '수진', '지원', '현정', '지연', '유진'  // 50대
  ];

  // 10대(10~19세)이면 배열 인덱스 0~9 / ... / 50대 40~49
  // 50대 랜덤 인덱스 예시: 0~9 사이 무작위 숫자 + 40 ('50'개짜리 배열 인덱스와 매핑하기 위해서 나이대 - '10'살) → 40~49 사이 무작위 인덱스
  const randomIndex = getRandomInRange(0, 9) + (getAgeRange(age) - 10);
  // const randomIndex = Math.floor(Math.random() * 10) + ((Math.floor(age / 10) * 10) - 10);

  return (gender.toUpperCase() == 'MALE') ? maleNames[randomIndex] : femaleNames[randomIndex];
}
// console.log(getRandomName('Female', 50));

// 무작위 주소
// 도시 미만 구역은 일단 간단하게 서울 정보로 시작하지만, 시간있으면 도시별 맞는 정보로 확장 예정
function getRandomAddress() {
  // 주요 도시명
  const cities = [
    '서울', '부산', '인천', '대전', '울산', '광주', '수원', '고양', '용인', '창원', '천안', '성남',
    '청주', '전주', '안양', '김해', '하남', '나주', '시흥', '진주', '이천', '광명', '양주'
  ];
  // 서울시 구 (일단 간단하게 이걸로 시작하지만, 시간있으면 도시별 구로 확장 예정)
  // const seoulDistricts = [
  const districts = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];
  // 서울시 통행량 많은 대로 (")
  const roads = [
    '강남대로', '테헤란로', '삼성로', '남대문로', '동대문로', '서울로', '종로',
    '청계천로', '시청로', '하남대로', '양재대로', '방배로', '수서로', '서초대로', '명동로',
    '동작대로', '왕십리로', '마포대로', '홍대앞길', '신촌로', '신림로', '도산대로', '강북로',
    '광화문로', '송파대로', '방배로', '응암로', '군자로', '일산로', '서울숲로', '강동대로',
    '구의로', '북악로', '청담로', '공덕로', '영등포로', '금천로', '광명로', '잠실로'
  ];

  // 아래 리턴문은 너무 긴데, formatter 때문에 가독성을 위한 줄바꿈도 불가능해서 그냥 문자열 수동 조립
  // return `${cities[getRandomIndex(cities.length)]} ${districts[getRandomIndex(districts.length)]} ${roads[getRandomIndex(roads.length)]} ${getRandomBetween(getRandomInRange(1, 150) + '길 ', '')}${getRandomInRange(1, 500)} `;
  return cities[getRandomIndex(cities.length)] + ' ' +
    districts[getRandomIndex(districts.length)] + ' ' +
    roads[getRandomIndex(roads.length)] + ' ' +
    getRandomBetween(getRandomInRange(1, 150) + '길 ', '') +
    getRandomInRange(1, 500);
}
// console.log(getRandomAddress());


// 0a234508-1a52-4339-9e49-9c3dcf3d8d33,장은지,Female,37,1985-12-25,광주 서구 31길 41
// → UUID, Name, Gender, Age, Birthday, Address 형태
const args = process.argv.slice(2);
for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const gender = getRandomGender();
  const age = getRandomAge();
  const birthdate = getRandomBirthday(age);
  const name = getRandomName(gender, age);
  const address = getRandomAddress();
  console.log(`${id},${name},${gender},${age},${birthdate},${address}`);
}

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

const records = [];
for (let i = 0; i < args[0]; i++) {
  const id = randomUUID();
  const gender = getRandomGender();
  const age = getRandomAge();
  const birthdate = getRandomBirthday(age);
  const name = getRandomName(gender, age);
  const address = getRandomAddress();
  records.push({
    id,
    name,
    gender,
    age,
    birthdate,
    address
  });
}

csvWriter.writeRecords(records) // returns a promise
  .then(() => {
    console.log('무작위 사용자 엑셀 파일 작성 완료');
  });
