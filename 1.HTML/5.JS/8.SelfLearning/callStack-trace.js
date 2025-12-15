// call stack trace
// (1. 시작) anonymous → A() → handleError(B) →  B() (2. call stack 상단)
// (3. 끝)   (global)  ←     ←                ←
// 즉, return 문이 있다고 자신은 콜스택에서 빠져나가고 return 문 뒤의 함수가 콜스택에 들어가는 게 아니라,
// return 문 뒤의 작업을 전부 마친 다음에 return 문이 실행되면서 자신이 콜스택에서 빠져나가는 것이다.
function handleError(fn) {
  try {
    console.log('handleError 함수 내에서 try 블럭 맨 위 (return B() 전)');
    return fn(); // 전달된 함수를 실행
  } catch (e) {
    console.error("Handled Error:", e.message);
    return null; // 오류 발생 시 null 반환 (또는 다른 적절한 값)
  }
}

function B() {
  console.log('B 함수 내에서 throw new Error 바로 위');
  throw new Error("Error in B");
}

function A() {
  console.log("A started");
  return handleError(B); // A에서 B 호출 시 예외 처리
}

A();
