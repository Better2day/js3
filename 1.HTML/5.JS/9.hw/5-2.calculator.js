const expression = document.getElementById('expression'); // 계산기 상단 계산식 표시 레이어 (연산자 포함)
const current = document.getElementById('current'); // 계산식 아래 현재 사용자가 입력중인 숫자 표시 레이어 (연산자 미포함)
const buttons = document.getElementsByTagName('button'); // 계산기 버튼 (숫자, 사칙 연산자, C, =)
const charNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // 숫자
const charOperators = ['+', '-', '*', '/']; // 사칙 연산자
let leftTerm = null; // 왼쪽 항
let opToApply = null; // 사칙 연산자
let rightTerm = null; // 오른쪽 항
// (좌항 사칙연산자 우항) 형태로 계산. e.g. 4 + 5 식에서 +가 계산에 적용할 연산자(opToApply)
let result = null; // = 버튼을 눌렀을 때만 할당되는 계산 결과
// 계산기를 처음 구동하면 화면에 0이 들어가 있으므로, 계산식도 '0'으로 시작 (C, = 버튼을 눌렀을 때도 '0'으로 초기화)
let totalInput = '0'; // 위 expression.innerText도 같은 값인데, 이 변수를 없애고 그것만 이용하는 게 낫지 않을까?
// JS 자료 유형에 ENUM(열거형)가 없어서, 열거형을 구현하기 위해 아래와 같이 붋변성(동결) 객체 생성
const TokenType = Object.freeze({
  NUM: Symbol('num'),
  OP: Symbol('op'),
  EQ: Symbol('eq')
});
// 사용자가 버튼을 누를 때마다 직전 입력 유형(숫자/연산자)을 간편하게 확인하기 위한 flag
// (이전 버전에서는 확인할 때마다 사용자가 입력한 계산식 전체의 마지막 값을 slice 함수에 넘기고 실행하느라 복잡)
let lastTokenType = null;

// cf. 토큰 나눌 때 다중 separator 사용하는 방법 (regular expression 이용). 아래 식은 사칙 연산자 전부를 separator로 이용
// console.log("2+3*4/5-2".split(/[+-\/\*]/));

// [재설계중]
// 1. 숫자 버튼 클릭
//    * 기본 원칙
//    직전 입력값이 숫자이면 그 뒤에 현재 입력값 추가 (자리수 올라감)
//    직전 입력값이 연산자이면 현재 
//    (예외 처리) 첫 입력이 숫자이면 0을 숫자로 대체
//    1) 계산중 숫자를 입력했을 때 
//    2) 계산 결과가 나온 직후 숫자를 입력했을 때 → 좌항에 계산 결과 할당
//
// 2. 사칙 연산자 버튼 클릭
//    1) 좌항이 존재하지 않으면 좌항에 current 할당, expression 레이어에 (좌항과 현재 사칙 연산자) 할당(및 표시)
//    2) (좌항이 존재하고) 우항이 존재하지 않으면 계산할 연산자(opToApply)에 현재 사칙 연산자(button.innerText) 할당
//    3) [예외 처리] 직전 입력값이 사칙 연산자면 이번 사칙 연산자로 대체해서 사칙 연산자 중첩 방지 (e.g. 3+-* 같은 계산식 예방)
//    4) 이전 사칙 연산자가 존재하면 우항에 current 할당 → (좌항 사칙연산자 우항)을 계산해서 좌항과 current에 할당 →
//       expression 레이어에 (좌항과 현재 사칙 연산자) 할당 → 우항에 null 할당
//
// 3. C(lear) 버튼 클릭: 사용자 입력, 계산식, 계산기 화면 전부 초기화
//
// 4. = 버튼 클릭: 계산 결과를 계산기 화면에 출력

// Token version not using convenient but risky eval() function (윈도우 내장 계산기 - 표준 모드 기반)
// (eval() ver.은 실수로 윈도우 계산기 - 공학 모드를 보고 만들었다.)
// 계산기의 모든 버튼에 추후 클릭시 실행할 이벤트 리스너 추가
for (let button of buttons) {
  button.addEventListener('click', () => {
    if (charNumbers.includes(button.innerText)) { // 숫자 버튼 처리
      processNumber(button);
    } else if (charOperators.includes(button.innerText)) { // 사칙 연산자 버튼 처리
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

// 숫자 버튼 처리
function processNumber(button) {
  // 계산식이 '0'으로 시작하므로(윈도우 내장 계산기처럼 변경),
  // 숫자 버튼을 눌렀을 때 0 뒤에 숫자를 추가하면 계산식과 계산 결과 모두 이상해진다.
  // 첫 입력이 숫자이면 0을 숫자로 대체
  if (totalInput.length == 1 && totalInput[0] == '0') {
    current.innerText = button.innerText;
    totalInput = button.innerText;
    console.log(`totalInput = ${totalInput}`);
  } else if (result == null) { // 계산중 숫자를 입력했을 때
    // 직전 입력값이 연산자이면 current.innerText에 그 이전 숫자(연산자 왼쪽 숫자)가 남아있으므로 이번에 입력한 숫자로 대체
    if (lastTokenType === TokenType.OP) {
      current.innerText = button.innerText;
    } else { // 직전 입력값이 숫자면 이번 숫자를 덧붙임 (자리수 증가)
      current.innerText += button.innerText;
    }
    totalInput += button.innerText;
    console.log(`totalInput = ${totalInput}`);
  } else { // 계산 결과가 나온 직후(result != null) 숫자를 입력했을 때
    current.innerText = button.innerText;
    // 계산식 레이어에 사용자가 입력한 계산식 전체를 표시 (계산용 변수인 totalInput을 화면 렌더링과 분리)
    expression.innerText = button.innerText;
    totalInput = button.innerText;
    result = null;
  }

  expression.innerText = totalInput;
  lastTokenType = TokenType.NUM;
}
// 사칙 연산자 버튼 처리
function processOperator(button) {
  // 직전 입력값이 연산자면 이번 연산자로 대체해서 연산자 중첩 방지
  if (lastTokenType === TokenType.OP) {
    totalInput = totalInput.substring(0, totalInput.length - 1) + button.innerText;
    expression.innerText = totalInput;
    opToApply = button.innerText;
  } else if (leftTerm == null) { // 계산식에서 처음으로 연산자를 썼을 때 처리
    leftTerm = parseInt(current.innerText);
    opToApply = button.innerText;
    totalInput += button.innerText;
    expression.innerText = totalInput;
  } else if (leftTerm != null) { // 지난 연산자 왼쪽 항에 숫자가 있으면 계산
    rightTerm = parseInt(current.innerText);
    calculate(button);
  }
  console.log(`leftTerm = ${leftTerm}`);
  console.log(`rightTerm = ${rightTerm}`);
  console.log(`opToApply = ${opToApply}`);
  console.log(`totalInput = ${totalInput}`);
  console.log(`result = ${result}`);

  expression.innerText = totalInput;
  lastTokenType = TokenType.OP;
}

// C(lear) 버튼 처리: 사용자 입력, 계산식, 계산기 화면 전부 초기화
function clear() {
  current.innerText = '0';
  expression.innerText = '0';
  totalInput = '0';
  leftTerm = 0;
  result = null;
  resetCommonVars();
}

// = 버튼 처리: 계산 결과를 계산기 화면에 출력
function processEqualBtn(button) {
  expression.innerText = totalInput + '='; // 계산식
  result = calculate(button);
  totalInput = result;
  console.log(`totalInput = ${totalInput}`);
  console.log(`result = ${result}`);

  resetCommonVars();
}

// 계산: = 버튼을 눌렀을 때 또는 (왼쪽 항, 연산자, 오른쪽 항)이 전부 있는 상태에서 또 연산자를 눌렀을 때 실행
function calculate(button) {
  // 계산식 마지막이 연산자이면 삭제 후 계산
  rightTerm = parseInt(current.innerText);
  if (lastTokenType === TokenType.OP) {
    totalInput = totalInput.substring(0, totalInput.length - 1)
  }
  switch (opToApply) {
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
  opToApply = button.innerText;
  return leftTerm;
}

// 공통 변수 초기화: C 버튼이나 = 버튼을 눌렀을 때 공통으로 초기화할 변수 처리
function resetCommonVars() {
  lastTokenType = TokenType.NUM;
  leftTerm = null;
  opToApply = null;
  rightTerm = null;
}