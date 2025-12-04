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

module.exports = { getRandomInRange, getRandomIndex, getRandomBetween };