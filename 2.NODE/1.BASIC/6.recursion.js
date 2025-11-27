// 재귀함수 (recursive function)

// Node.js에서는 잠시 실행되다가 오류가 발생하며 종료되지만, 다른 곳에서는 보통 멈춰버린다.
// function myFunction() {
//   console.log('hello');
//   myFunction();
// }

// myFunction();

// function factorial(n) {
//   if (n == 1) return n; // 종료 조건
//   result = n * factorial(n - 1);
//   return result;
// }

// console.log(factorial(10));

function fibonacci(n) {
  console.log(`피보나치 내부. 피보나치(${n}) 실행중`);
  if (n == 1 || n == 2) {
    console.log(`피보나치 내부. ${n}항 더하는 중`);
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// console.log(fibonacci(1));
// console.log(fibonacci(2));
// console.log(fibonacci(3));
// console.log(fibonacci(4));
console.log(fibonacci(5));
// console.log(fibonacci(6));
// console.log(fibonacci(10));
