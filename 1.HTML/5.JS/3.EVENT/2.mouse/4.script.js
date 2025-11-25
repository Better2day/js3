function mouseClick() {
  console.log('클릭되었습니다');
}

const myButton = document.getElementById('myButton');
myButton.addEventListener('click', mouseClick);

// 1. DOM을 가져온다.
// 2. 원하는 이벤트를 등록한다
// 3. 그 이벤트가 발생했을 때 처리할 콜백 함수를 등록한다.
// 4. 이벤트가 발생하면 자동으로 그 함수가 호출되서 실행된다. (비동기 처리)