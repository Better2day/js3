function sumToNum(max) {
  // 1부터 100까지의 합을 구하시오..
  // let sum; // 이걸로 시작하면 NaN 나온다.
  let sum = 0;
  for (let i = 1; i <= max; i++) {
    sum += i;
  }
  console.log(sum);
  //   console.log('1부터 100까지의 합은: ', sum);
  //   console.log('NaN + 10 = ' + NaN + 10);
  //   console.log('NaN + 10 = ', NaN + 10);
  //   console.log('null + 10 = ', null + 10);
  //   console.log('undefined + 10 = ', undefined + 10);
  //
}

console.time('sumToNum(100) 실행 시간');
sumToNum(100);
console.timeEnd('sumToNum(100) 실행 시간');

console.time('sumToNumGauss(100) 실행 시간');
sumToNumGauss(100);
console.timeEnd('sumToNumGauss(100) 실행 시간');

// sumToNum(100);
// sumToNum(1000);
// sumToNum(10000);
// sumToNum(10000000);
// sumToNum(1_000_000_000);

// console.time('sumToNum(100억) 실행 시간');
// sumToNum(10_000_000_000);
// console.timeEnd('sumToNum(100억) 실행 시간');

function sumToNumGauss(max) {
  let sum = (max * (max + 1)) / 2;

  console.log(`1부터 100까지의 합은: ${sum}`)
}

console.time('sumToNumGauss(100억) 실행 시간');
sumToNumGauss(10_000_000_000);
console.timeEnd('sumToNumGauss(100억) 실행 시간');
