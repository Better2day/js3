/* Mission 1
버튼 1개로 유지함
한 번 누르면 빨강, 또 누르면 파랑, 또 누르면 빨강 ~ 식으로 반복 */
/*
function changeBGColor() {
  let backgroundColor = document.body.style.backgroundColor;
  if (backgroundColor == 'red') {
    document.body.style.backgroundColor = 'blue';
  } else if (backgroundColor == 'blue') {
    document.body.style.backgroundColor = 'red';
  }
}
 */


/*
Mission 2
위 미션을 기반으로, 세 가지 색 순환하기 (클릭할 때마다 다음 색으로)
클릭: red → blue / 클릭: blue → green / 클릭: green → red
 */

/*
let currentIdx = 0;
function cycleBGColor() {
  let backgroundColor = document.body.style.backgroundColor;

  // if (backgroundColor == 'red') {
  //   document.body.style.backgroundColor = 'blue';
  // } else if (backgroundColor == 'blue') {
  //   document.body.style.backgroundColor = 'green';
  // } else if (backgroundColor == 'green') {
  //   document.body.style.backgroundColor = 'red';
  // }

  // switch (backgroundColor) {
  //   case 'red':
  //     document.body.style.backgroundColor = 'blue';
  //     break;
  //   case 'blue':
  //     document.body.style.backgroundColor = 'green';
  //     break;
  //   case 'green':
  //     document.body.style.backgroundColor = 'red';
  //     break;
  // }

  const colors = ['red', 'blue', 'green'];
  // document.body.style.backgroundColor = colors[currentIdx++];
  // if (currentIdx >= colors.length) {
  //   currentIdx = 0;
  // }
  // currentIdx = (currentIdx >= colors.length) ? 0 : currentIdx;
  document.body.style.backgroundColor = colors[currentIdx];
  currentIdx = (currentIdx + 1) % colors.length;
}
 */


// Mission 3
// Random 색상
/*
function randomBGColor() {
  // let red = Math.floor(Math.random() * 256);
  // let green = Math.floor(Math.random() * 256);
  // let blue = Math.floor(Math.random() * 256);
  // document.body.style.backgroundColor = rgba(red, green, blue);
  // CSS에서는 rgb(128, 255, 0) 같은 게 됐는데, JS에서는 오류 (그런 함수 없음)

  let red = Math.floor(Math.random() * 256).toString(16);
  let green = Math.floor(Math.random() * 256).toString(16);
  let blue = Math.floor(Math.random() * 256).toString(16);
  // document.body.style.backgroundColor = '#' + red + green + blue;
  document.body.style.backgroundColor = `#${red}${green}${blue}`;
}
 */


// Mission 4
// Random 색상 + 디자인 꾸미기

function randomBGColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  // 2. 오류 해결: 16진수 색상코드의 R, G, B 별로 패딩 처리(R, G, B 각각 2자리, 합쳐서 6자리를 유지하도록)해서 해결
  let redHex = red.toString(16).padStart(2, '0');
  let greenHex = green.toString(16).padStart(2, '0');
  let blueHex = blue.toString(16).padStart(2, '0');
  // 랜덤 배경 색상이 색상 코드 레이어의 테두리와 같은 색이면 테두리가 안 보이게 되므로, 테두리 색은 항상 랜덤 색상의 보색으로 설정
  let redComp = 255 - red;
  let greenComp = 255 - green;
  let blueComp = 255 - blue;
  console.log(`bg = (${red}, ${green}, ${blue}) / bgHex = #${redHex}${greenHex}${blueHex}`);
  // 가시성에만 초점을 두면, 보색이 아니라 그냥 50~100 정도를 더해도 별 차이 없을 것 같다. (단, 더한 게 255를 넘는 경우, modulus 처리)
  // let redComp = (red + 100) % 255;
  // let greenComp = (green + 100) % 255;
  // let blueComp = (blue + 100) % 255;

  // document.body.style = `background-color: rgb(${red}, ${green}, ${blue})`; // 오류 발생하지 않음
  // document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`; // 오류 발생하지 않음
  // document.body.style.backgroundColor = `#a5f25`; // 오류 발생 → 랜덤 색상 적용 안 됨 (오류 메시지가 안 나와서 디버깅 더 어려움!)
  // 1. 가끔씩 발생하는 오류의 원인 발견:
  // 아래 16진수 색상코드의 문자열 길이가 6자리 미만이면, 버튼 클릭시 body style에 들어가는 색상코드가 변경되지 않는다.
  // JS 소스코드에 '16진수' 색상코드를 넣어도, 클릭 이벤트 발생 후 이 함수가 호출된 후에
  // body.style이 변경될 때 브라우저가 '10진수'를 사용하는 rgb() 형태로 자동 변환한 후 렌더링하는 것 같은데,
  // 16진수 색상코드의 문자열 길이가 6자리 미만이면 자동 변환이 되지 않는 것을 확인 (개발자 도구 → Element 탭에서 확인)
  document.body.style.backgroundColor = `#${redHex}${greenHex}${blueHex}`;
  // document.getElementById('RGBCode').style.display = 'block';
  document.getElementById('RGBCode').style = `border: 1px solid rgb(${redComp}, ${greenComp}, ${blueComp})`;
  document.getElementById('RGBCode').innerHTML = `RGB(${red}, ${green}, ${blue})<BR>#${redHex}${greenHex}${blueHex}`;
  // return 0;
}