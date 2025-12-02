const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // 표준 입력 (키보드 입력; 0)
  output: process.stdout // 표준 출력 (콘솔/화면 출력; 1)
});

function gugudan(num) {
  console.log(`=== ${num}단 ===`);
  for (let i = 1; i <= 9; i++) {
    console.log(`${num} * ${i} = ${num * i}`);
  }
}

console.log('여기가 1');

// rl이라는 변수를 통해서 키보드 입출력이 가능해졌음
rl.question('원하는 단을 입력하세요: ', dan => {
  // console.log('단: ', dan);
  gugudan(dan);
  rl.close();
});

console.log('여기가 2');
