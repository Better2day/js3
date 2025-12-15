
// 1. 고차 함수 이해
// function makeAdder(x) {
//   return function (y) {
//     return x + y;
//   }
// }

// const add10 = makeAdder(10);
// add10 변수에는 makeAdder 함수에 인수 10을 넘겨주면서 호출한 결과인 내부 함수가 바인딩된다.
// console.log(add10(3));

// console.log(add10.name); // makeAdder 아님. 익명 함수라서 공백 출력
// console.log(makeAdder.name);
// console.log(add10.name === makeAdder.name);


// 2. 고차 함수를 화살표 함수로 변환 연습
// 위 함수에서 내부 함수를 화살표 함수로 변환
// function makeAdder(x) {
//   return y => x + y; // ※ y = x + y (statement)가 아니라 화살표 함수를 반환!
// }

// 위 함수에서 외부 함수를 익명 함수로 변환하려고 하니까 오류 발생.
// 익명 함수인데 어디 바인딩도 안 되어서 호출할 방법이 없어서 그런 듯. (콜백 함수로는 가능할 듯?)
// function (x) {
//   return y => x + y;
// }

// 위 함수에서 외부 함수도 화살표 함수로 변환
// 단, 익명 함수이므로 추후 호출하기 위해서 상수 arrowFunc에 바인딩
// arrowFunc(x)를 호출하면 y => x + y 함수를 반환 → arrowFunc 상수에 그 함수가 바인딩
const arrowFunc = x => y => x + y;
// add10 상수에 (y => 10 + y) 함수 바인딩
const add10 = arrowFunc(10);
// add10(3) 식으로 함수를 호출하면 10 + 3(y)인 13을 결과로 반환
console.log(add10(3));

const arr = new Array(5).fill();
arr.forEach((v, i, array) => array[i] = () => i);
arr.forEach(f => console.log(f()));
