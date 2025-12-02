// 파일 입출력
// https://nodejs.org/docs/latest에서 fs (filesystem) 관련 내용을 찾는다.

// 1.
const fs = require('fs');

// callback. 시킨 일을 다 하면 나를 호출해 줘 (function 끝났을 때 호출될 함수)
// function callbackFunc(error, success) {
//   console.log('일단 끝');
//   console.log('error에는 무엇을 담아줬지?', error);
//   console.log('success에는 무엇을 담아줬지?', success);
// }

// 2.
// 파일 읽기
fs.readFile('example.txt', 'utf8', (err, data) => {
  // 2-a. 언제 호출될지 모름. 파일 읽기가 종료되면 콜백
  console.log('일단 끝 - 결과가 성공이든 실패이든 일단 종료');
  if (err) {
    console.log('파일 읽기에 실패했습니다.', err.message);
  } else {
    console.log('(파일 읽기 성공) 보통 알려주지 않고 결과만 반환');
    console.log(data);
  }
});

// 3.
console.log('내가 더 먼저 끝남');

// 4.
// 파일 쓰기
const content = '여기는 내가 쓰고 싶은 내용을 적었습니다';
fs.writeFile('example2.txt', content, 'utf8', err => {
  // 4-a. 언제 호출될지 모름. 파일 쓰기가 종료되면 콜백
  if (err) {
    console.log('파일 쓰기에 실패했습니다.');
  } else {
    console.log('파일 쓰기에 성공했습니다.');
  }
})

// 5.
console.log('난 언제 호출될까?');