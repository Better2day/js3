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
  let redHex = Math.floor(Math.random() * 256).toString(16);
  let greenHex = Math.floor(Math.random() * 256).toString(16);
  let blueHex = Math.floor(Math.random() * 256).toString(16);
  // 랜덤 배경 색상이 색상 코드 레이어의 테두리와 같은 색이면 테두리가 안 보이게 되므로, 테두리 색은 항상 랜덤 색상의 보색으로 설정
  let redComp = 255 - red;
  let greenComp = 255 - green;
  let blueComp = 255 - blue;
  // 가시성에만 초점을 두면, 보색이 아니라 그냥 50~100 정도를 더해도 별 차이 없을 것 같다. (단, 더한 게 255를 넘는 경우, modulus 처리)
  // let redComp = (red + 100) % 255;
  // let greenComp = (green + 100) % 255;
  // let blueComp = (blue + 100) % 255;

  document.body.style.backgroundColor = `#${redHex}${greenHex}${blueHex}`;
  // document.getElementById('RGBCode').style.display = 'block';
  document.getElementById('RGBCode').style = `border: 1px solid rgb(${redComp}, ${greenComp}, ${blueComp})`;
  document.getElementById('RGBCode').innerHTML = `RGB(${red}, ${green}, ${blue})<BR>#${redHex}${greenHex}${blueHex}`;
}
