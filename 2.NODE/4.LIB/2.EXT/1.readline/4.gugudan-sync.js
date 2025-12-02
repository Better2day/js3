const readline = require('readline-sync');

rl = readline;

// const rl = readline.createInterface({
//   input: process.stdin, // 표준 입력 (키보드 입력; 0)
//   output: process.stdout // 표준 출력 (콘솔/화면 출력; 1)
// });

function gugudan(num) {
  console.log(`=== ${num}단 ===`);
  for (let i = 1; i <= 9; i++) {
    console.log(`${num} * ${i} = ${num * i}`);
  }
}

console.log('여기가 1');

// 비동기이므로 callback의 필요성이 사라졌다.
const input = rl.question('원하는 단을 입력하세요: ');
console.log('입력값: ', input);
gugudan(input);

console.log('여기가 2');

// Unicode를 제대로 지원하지 못 하는 경우가 많다.
