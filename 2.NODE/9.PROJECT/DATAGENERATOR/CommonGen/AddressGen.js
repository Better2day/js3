const { getRandomInRange, getRandomElement, getRandomIndex, getRandomBetween } = require('../util/getRandom');

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
  // return `${getRandomElement(cities)} ${getRandomElement(districts)} ${getRandomElement(roads)} ${getRandomBetween(getRandomInRange(1, 150) + '길 ', '')}${getRandomInRange(1, 500)}`;
  return getRandomElement(cities) + ' ' + getRandomElement(districts) + ' ' + getRandomElement(roads) + ' ' +
    getRandomBetween(getRandomInRange(1, 150) + '길 ', '') + getRandomInRange(1, 500);
}

module.exports = { getRandomAddress };
