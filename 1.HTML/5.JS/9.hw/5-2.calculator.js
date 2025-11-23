const buttons = document.getElementsByTagName('button');
const current = document.getElementById('current');
const charNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const charOperators = ['+', '-', '*', '/'];
// 계산기를 처음 구동하면 화면에 0이 들어가 있는데, 계산식은 공백
// 계산식도 '0'으로 시작하도록 변경 (C, = 버튼을 눌렀을 때도 '0'으로 초기화)
let totalInput = '0';
let leftTerm = null;
let rightTerm = null;
let result = null;
// JS 자료 유형에 ENUM(열거형)가 없어서, 열거형을 구현하기 위해 아래와 같이 붋변성(동결) 객체 생성
const TokenType = Object.freeze({
  NUM: Symbol('num'),
  OP: Symbol('op')
});
// 사용자가 버튼을 누를 때마다 직전 입력 유형(숫자/연산자)을 간편하게 확인하기 위한 flag
// (이전 버전에서는 사용자가 입력한 계산식 전체의 마지막 값을 slice 함수에 넘기고 실행해서 확인)
let lastTokenType = null;
let lastOperator = null;

// 2. Token version not using convenient but risky eval() function (윈도우 내장 계산기 - 표준 모드 기반)
// (실수로 1. eval() ver.은 윈도우 계산기 - 공학 모드를 보고 만들었다.)
// 계산기의 모든 버튼에 추후 클릭시 실행할 이벤트 리스너 추가
for (let button of buttons) {
  button.addEventListener('click', () => {
    if (charNumbers.includes(button.innerText)) { // 숫자 버튼 처리
      processNumber(button);
    } else if (charOperators.includes(button.innerText)) { // 사칙 연산 버튼 처리
      processOperator(button);
    } else if (button.innerText === 'C') { // Clear 버튼 처리
      clear();
    } else if (button.innerText === '=') { // = 버튼 처리
      processEqualBtn(button);
    } else {
      console.log(`[비정상 접근] Client Hacked !!`);
    }
  })
}

// 숫자 버튼 처리 함수
function processNumber(button) {
  // 계산식이 '0'으로 시작하므로(윈도우 내장 계산기처럼 변경),
  // 숫자 버튼을 눌렀을 때 0 뒤에 숫자를 추가하면 계산식과 계산 결과 모두 이상해진다.
  // 첫 입력이 숫자이면 0을 숫자로 대체
  if (totalInput.length == 1 && totalInput[0] == '0') {
    current.innerText = button.innerText;
    totalInput = button.innerText;
    console.log(`totalInput = ${totalInput}`);
  } else if (result != null) { // 계산 결과가 나온 직후, 사용자가 숫자를 입력했을 때
    current.innerText = button.innerText;
    expression.innerText = button.innerText;
    totalInput = button.innerText;
    result = null;
  } else {
    // 직전 입력값이 연산자이면 current.innerText에 그 이전 숫자(연산자 왼쪽 숫자)가 남아있으므로 이번에 입력한 숫자로 대체
    if (lastTokenType === TokenType.OP) {
      current.innerText = button.innerText;
    } else { // 직전 입력값이 숫자면 이번 숫자를 덧붙임 (자리수 증가)
      current.innerText += button.innerText;
    }
    totalInput += button.innerText;
    console.log(`totalInput = ${totalInput}`);
  }
  // 계산식 레이어에 사용자가 입력한 계산식 전체를 표시 (계산용 변수인 totalInput을 화면 렌더링과 분리)
  expression.innerText = totalInput;
  lastTokenType = TokenType.NUM;
}
// 사칙 연산 버튼 처리 함수
function processOperator(button) {
  // 직전 입력값이 연산자면 이번 연산자로 대체해서 연산자 중첩 방지
  if (lastTokenType === TokenType.OP) {
    totalInput = totalInput.substring(0, totalInput.length - 1) + button.innerText;
    expression.innerText = totalInput;
    lastOperator = button.innerText;
  } else if (leftTerm == null) { // 계산식에서 처음으로 연산자를 썼을 때 처리
    leftTerm = parseInt(current.innerText);
    lastOperator = button.innerText;
    totalInput += button.innerText;
    expression.innerText = totalInput;
  } else if (leftTerm != null) { // 지난 연산자 왼쪽 항에 숫자가 있으면 계산
    rightTerm = parseInt(current.innerText);
    calculate(button);
  }
  console.log(`leftTerm = ${leftTerm}`);
  console.log(`rightTerm = ${rightTerm}`);
  console.log(`lastOperator = ${lastOperator}`);
  console.log(`totalInput = ${totalInput}`);
  console.log(`result = ${result}`);

  expression.innerText = totalInput;
  lastTokenType = TokenType.OP;
}

// C 버튼을 클릭하면 사용자 입력, 계산식, 계산기 화면 전부 초기화
function clear() {
  current.innerText = '0';
  expression.innerText = '0';
  totalInput = '0';
  leftTerm = 0;
  result = null;
  resetCommonVars();
}

// = 버튼을 클릭하면 계산 결과를 계산기 화면에 출력
function processEqualBtn(button) {
  expression.innerText = totalInput + '='; // 계산식
  result = calculate(button);
  totalInput = result;
  console.log(`totalInput = ${totalInput}`);
  console.log(`result = ${result}`);

  resetCommonVars();
}

function calculate(button) {
  // 계산식 마지막이 연산자이면 삭제 후 계산
  rightTerm = parseInt(current.innerText);
  if (lastTokenType === TokenType.OP) {
    totalInput = totalInput.substring(0, totalInput.length - 1)
  }
  switch (lastOperator) {
    case '+':
      // result = leftTerm + parseInt(current.innerText);
      leftTerm = leftTerm + rightTerm;
      break;
    case '-':
      // result = leftTerm - parseInt(current.innerText);
      leftTerm = leftTerm - rightTerm;
      break;
    case '*':
      // result = leftTerm * parseInt(current.innerText);
      leftTerm = leftTerm * rightTerm;
      break;
    case '/':
      // result = leftTerm / parseInt(current.innerText);
      leftTerm = leftTerm / rightTerm;
      break;
  }
  console.log(`leftTerm = ${leftTerm}`);
  // leftTerm = result;
  current.innerText = leftTerm;
  expression.innerText = totalInput + button.innerText;
  totalInput = result + button.innerText;
  lastOperator = button.innerText;
  return leftTerm;
}

function resetCommonVars() {
  lastTokenType = TokenType.NUM;
  leftTerm = null;
  lastOperator = null;
  rightTerm = null;
}