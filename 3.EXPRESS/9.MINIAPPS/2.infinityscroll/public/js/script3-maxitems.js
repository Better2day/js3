// 시작시 초기값
const itemsPerLoad = 20; // 스크롤바가 화면 하단에 도착할 때마다 추가로 불러오는 개수
const maxItemsOnScreen = 100; // 화면 안에 유지할 품목 최대 개수

let start = 0;
let end = start + itemsPerLoad;

async function getItemsFromTo() {
  const response = await fetch(`/api/items?start=${start}&end=${end}`);
  const data = await response.json();
  console.log(data);
  const result = document.getElementById('result');

  data.forEach(item => {
    // console.log(el);
    const itemElement = document.createElement('div');
    itemElement.classList.add('item'); // 디자인을 넣기 위해서 클래스 추가
    itemElement.textContent = item;
    result.appendChild(itemElement);

    let itemsToRemove = result.children.length - maxItemsOnScreen;
    if (itemsToRemove > 0) {
      console.log('지워야 할 품목 개수: ', itemsToRemove);
      while (itemsToRemove-- > 0) {
        result.removeChild(result.firstElementChild);
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");

  getItemsFromTo();

  // result.innerHTML = data;
});

window.addEventListener('scroll', () => {
  // console.log('스크롤 발생??', window.innerHeight, window.scrollY);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log('문서 하단에 도달');

    const result = document.getElementById('result');

    start = end;
    end = end + itemsPerLoad;

    getItemsFromTo();
  }
});
