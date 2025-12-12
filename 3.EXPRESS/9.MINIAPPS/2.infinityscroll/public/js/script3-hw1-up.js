// 시작시 초기값
const itemsPerLoad = 20; // 스크롤바가 화면 하단에 도착할 때마다 추가로 불러오는 개수
const maxItemsOnScreen = 60; // 화면 안에 유지할 품목 최대 개수

let prevStart = 0;
let prevEnd = prevStart + itemsPerLoad;
let nextStart = 0;
let nextEnd = nextStart + itemsPerLoad;

const result = document.getElementById('result');

async function getNextItems() {
  // nextStart = nextEnd;
  if (result.childElementCount > 0) {
    console.log(result.lastElementChild.textContent.split(' ').slice(-1));
  }

  nextStart = (result.childElementCount) ? parseInt(result.lastElementChild.textContent.split(' ').slice(-1)) : 0;
  nextEnd = nextStart + itemsPerLoad;
  console.log(`nextStart: ${nextStart} / nextEnd: ${nextEnd}`);

  const response = await fetch(`/api/items?start=${nextStart}&end=${nextEnd}`);
  const data = await response.json();
  console.log(data);

  // 품목 1개를 추가할 때마다 active document tree structure에 반영할 필요는 없어서 프래그먼트 이용 
  const fragment = new DocumentFragment();
  data.forEach(item => {
    // console.log(el);
    const itemElement = document.createElement('div');
    itemElement.classList.add('item'); // 디자인을 넣기 위해서 클래스 추가
    itemElement.textContent = item;
    fragment.appendChild(itemElement);
  })
  // itemsPerLoad 개만큼의 품목이 전부 추가되었으면, 결과 레이어 하단에 추가
  result.appendChild(fragment);

  let itemsToRemove = result.children.length - maxItemsOnScreen;
  if (itemsToRemove > 0) {
    removePrevItems(itemsToRemove);
  }
}

async function getPrevItems() {
  // prevEnd = Math.max(0, nextEnd - maxItemsOnScreen); // 배열을 검색할 시작 인덱스가 0보다 작아지지 않도록 제한
  // prevStart = Math.max(0, prevEnd - itemsPerLoad);

  // 배열을 검색할 시작 인덱스가 0보다 작아지지 않도록 제한
  prevEnd = Math.max(0, parseInt(result.firstElementChild.textContent.split(' ').slice(-1)) - 1);
  prevStart = Math.max(0, prevEnd - itemsPerLoad);
  console.log(`prevStart: ${prevStart} / prevEnd: ${prevEnd}`);

  if (prevEnd == 0) {
    return false;
  }

  const response = await fetch(`/api/items?start=${prevStart}&end=${prevEnd}`);
  const data = await response.json();
  console.log(data);

  // 품목 1개를 추가할 때마다 active document tree structure에 반영할 필요는 없어서 프래그먼트 이용 
  const fragment = new DocumentFragment();
  data.forEach(item => {
    // console.log(el);
    const itemElement = document.createElement('div');
    itemElement.classList.add('item'); // 디자인을 넣기 위해서 클래스 추가
    itemElement.textContent = item;
    fragment.appendChild(itemElement);
  })
  // itemsPerLoad 개만큼의 품목이 전부 추가되었으면, 결과 레이어 상단에 추가
  result.prepend(fragment);

  let itemsToRemove = result.children.length - maxItemsOnScreen;
  if (itemsToRemove > 0) {
    removeNextItems(itemsToRemove);
  }
}

function removePrevItems(itemsToRemove) {
  console.log('지워야 할 품목 개수: ', itemsToRemove);
  while (itemsToRemove-- > 0) {
    result.removeChild(result.firstElementChild);
  }
}

function removeNextItems(itemsToRemove) {
  console.log('지워야 할 품목 개수: ', itemsToRemove);
  while (itemsToRemove-- > 0) {
    result.removeChild(result.lastElementChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");

  getNextItems();
});

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    getNextItems();
  } else if (window.scrollY == 0) {
    getPrevItems();
  }
});
