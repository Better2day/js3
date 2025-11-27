let a = 10;
const pi = 3.14;

a = 20;
// pi = 4.44; // const는 변경 불가능. 오류 발생 - TypeError: Assignment to constant variable.

a = 30;

let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Scope
let globalA = 50; // 전역 변수

function myFunction() {
  let localA = 30; // 로컬 변수

  console.log(globalA);
  console.log(localA);
}
myFunction();

console.log(globalA);
console.log(localA); // 다른 블록의 로컬 변수는 접근 불가능
