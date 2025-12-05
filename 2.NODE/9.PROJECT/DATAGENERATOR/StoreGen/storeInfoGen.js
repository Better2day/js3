const { getRandomIndex, getRandomInRange } = require('../util/getRandom');

const cafe = ['메가', '컴포즈', '투썸', '스타벅스', '이디야', '커피빈', '홀리스', '엔젤리너스'];
const location = [
  '강남', '홍대', '신촌', '합정', '이태원', '연남동', '성수', '건대', '잠실', '사당', '교대', '서초',
  '명동', '을지로', '종각', '종로3가', '동묘', '혜화', '대학로', '왕십리', '뚝섬', '압구정', '청담',
  '삼청동', '북촌', '인사동', 'DMC', '마포', '공덕', '상수', '망원', '신사', '여의도', '노원', '수유',
  '송도', '수원', '분당', '판교', '일산', '의정부', '범계', '서면', '광안리', '둔산'];

// 무작위 카페 프랜차이즈
function getRandomBrand() {
  return cafe[getRandomIndex(cafe.length)];
}

// 무작위 카페 지점
function getRandomBranch(type) {
  return `${type} ${location[getRandomIndex(location.length)]}${getRandomInRange(1, 10)}호점`;
}

module.exports = { getRandomBrand, getRandomBranch };
