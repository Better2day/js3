// 스크롤바가 화면 하단/상단에 도달할 때마다 추가로 불러오는 품목 개수
const itemsPerLoad = 20;
// 화면 안에 유지할 품목 최대 개수 (DOM, CPU/Memoery 등 리소스 절약 및 느려짐 방지 목적)
const maxItemsOnScreen = 40;

// getPrevItems() 함수를 통해서 이전 아이템을 읽어올 때 사용할 배열 범위 (시작 ~ 끝 인덱스)
let prevStart = 0;
let prevEnd = prevStart + itemsPerLoad;
// getNextItems() 함수를 통해서 다음 아이템을 읽어올 때 "
let nextStart = 0;
let nextEnd = nextStart + itemsPerLoad;

const result = document.getElementById('result');

async function getNextItems() {
  if (result.childElementCount > 0) {
    console.log('getNextItems() 함수 시작');
    console.log('현재 화면 하단 마지막 품목: Item ', result.lastElementChild.textContent.split(' ').slice(-1)[0]);
  }

  const data = await fetchData(nextStart, nextEnd);
  // const response = await fetch(`/api/items?start=${nextStart}&end=${nextEnd}`);
  // const data = await response.json();
  // console.log(data);

  // 품목 1개를 추가할 때마다 active document tree structure에 반영할 필요는 없어서 프래그먼트 이용 
  const fragment = new DocumentFragment();
  data.forEach(item => appendChildToParent(fragment, item));
  // itemsPerLoad 개만큼의 품목이 전부 추가되었으면, 결과 레이어 하단에 추가
  result.appendChild(fragment);

  // 새로 다음(하단) 품목을 읽어왔으므로 추가한 품목 개수만큼,
  // 다음 번 getNextItems() 함수 호출시 사용할 nextStart/nextEnd 배열 인덱스 범위를 뒤로 옮긴다.
  // getPrevItems와 다르게 fetch 후에 설정하는 이유는,
  // 백엔드에서 일정 주기로 품목이 무작위로 생성되고 있어서, 일단 다음 품목을 읽어와야 하기 때문이다.
  // (실제 시스템도 품목 추가/삭제가 발생하므로 마찬가지 상황)
  // 결과 레이어 하단 아이템의 품번은 다음 로딩과 무관하고, 무조건 읽기 시도 후 반환 품목에 따라서 다음 로드 범위를 조절한다.
  setNextRange();

  console.log('현재 화면에 보이는 품목 전체 개수: ', result.children.length);
  console.log('화면당 품목 최대 개수: ', maxItemsOnScreen);

  let itemQtyToRemove = result.children.length - maxItemsOnScreen;
  if (itemQtyToRemove > 0) {
    removePrevItems(itemQtyToRemove);
    // 다음 번 getPrevItems() 함수 호출에 사용할 배열 인덱스 범위 조절
    // ∵ maxItemsOnScreen 개수를 초과하는만큼 상단 품목을 삭제했으므로,
    // 삭제한 개수만큼 prevStart/prevEnd 배열 인덱스 범위를 뒤로 옮겨놓아야
    // 다음에 이전 품목 로딩시 중간에 누락되는 품목이 생기지 않는다.
    // scrollBy(0, -1 * itemQtyToRemove * 60); // height + gap = 60px
    // scrollBy(0, -1 * (itemQtyToRemove / maxItemsOnScreen) * window.innerHeight);
    setPrevRange();
  }
  console.log('getNextItems() 함수 끝');
}

// ※ 스크롤이 발생해서 한쪽 끝에 도달하면, 양방향 모두 다음 번에 로딩할 배열 인덱스 범위를 조절해야 한다.

async function getPrevItems() {
  console.log('getPrevItems() 함수 시작');
  console.log('현재 화면 상단 첫 품목: Item ', result.firstElementChild.textContent.split(' ').slice(-1)[0]);

  // getPrevItems() 함수 호출시 사용할 prevStart/prevEnd 배열 인덱스 설정
  setPrevRange();

  // 화면 최상단에 이미 첫 품목이 있으면 이전 품목 로드 작업 중단 (fetch로 발생하는 network, disk I/O 부하 제거)
  // getNextItems와 다르게 fetch 전에 setPrevRange() 함수를 통해서 배열 인덱스를 설정하는 이유이다.
  if (prevEnd == 0) {
    return false;
  }

  const data = await fetchData(prevStart, prevEnd);
  // const response = await fetch(`/api/items?start=${prevStart}&end=${prevEnd}`);
  // const data = await response.json();
  // console.log(data);

  const fragment = new DocumentFragment();
  data.forEach(item => appendChildToParent(fragment, item));
  // itemsPerLoad 개만큼의 품목이 전부 추가되었으면, 결과 레이어 상단에 추가 (div 아래, 기존 자식 앞에 추가)
  result.prepend(fragment);

  console.log('현재 화면에 보이는 품목 전체 개수: ', result.children.length);
  console.log('화면당 품목 최대 개수: ', maxItemsOnScreen);

  let itemQtyToRemove = result.children.length - maxItemsOnScreen;
  if (itemQtyToRemove > 0) {
    removeNextItems(itemQtyToRemove);
    // 다음 번 getNextItems() 함수 호출에 사용할 배열 인덱스 범위 조절
    // 삭제한 개수만큼 nextStart/nextEnd 배열 인덱스 범위를 앞으로 옮겨놓아야
    // 다음에 다음 품목 로딩시 중간에 누락되는 품목이 생기지 않는다.
    // scrollBy(0, itemQtyToRemove * 60);
    setNextRange();
  }
}

async function fetchData(rangeStart, rangeEnd) {
  const response = await fetch(`/api/items?start=${rangeStart}&end=${rangeEnd}`);
  const data = await response.json();
  console.log(data);
  return data;
}

// 부모 노드에 자식 노드 추가
function appendChildToParent(parent, child) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('item');
  itemElement.textContent = child;
  parent.appendChild(itemElement);
}

function removePrevItems(itemQtyToRemove) {
  console.log('지워야 할 품목 개수: ', itemQtyToRemove);
  while (itemQtyToRemove-- > 0) {
    result.removeChild(result.firstElementChild);
  }
}

function removeNextItems(itemQtyToRemove) {
  console.log('지워야 할 품목 개수: ', itemQtyToRemove);
  while (itemQtyToRemove-- > 0) {
    result.removeChild(result.lastElementChild);
  }
}

// getPrevtems() 함수 호출시 사용할 prevStart/prevEnd 배열 인덱스 범위 설정
function setPrevRange() {
  // 배열 인덱스 범위 설정중, 검색할 시작/끝 인덱스가 0 미만이 되는 일을 예방(제한)하기 위해 max 함수 사용
  prevEnd = Math.max(0, parseInt(result.firstElementChild.textContent.split(' ').slice(-1)) - 1);
  prevStart = Math.max(0, prevEnd - itemsPerLoad);
  console.log(`prevStart: ${prevStart} / prevEnd: ${prevEnd}`);
}

// getNextItems() 함수 호출시 사용할 nextStart/nextEnd 배열 인덱스 범위 설정
function setNextRange() {
  nextStart = parseInt(result.lastElementChild.textContent.split(' ').slice(-1));
  nextEnd = nextStart + itemsPerLoad;
  console.log(`nextStart: ${nextStart} / nextEnd: ${nextEnd}`);
}


document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");

  getNextItems(); // 웹페이지 접속시 itemsPerLoad 개수만큼 초기 품목 읽어오기
});

window.addEventListener('scroll', () => {
  // const oldScrollY = window.scrollY;
  // console.log('window.scrollY: ', oldScrollY);
  console.log(`window.innerHeight: ${window.innerHeight}, window.scrollY: ${window.scrollY}, document.body.offsetHeight: ${document.body.offsetHeight}`);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log(`window.innerHeight: ${window.innerHeight}, window.scrollY: ${window.scrollY}, document.body.offsetHeight: ${document.body.offsetHeight}`);
    getNextItems();
    // window.scrollTo(0, oldScrollY);
  } else if (window.scrollY == 0) {
    console.log(`window.innerHeight: ${window.innerHeight}, window.scrollY: ${window.scrollY}, document.body.offsetHeight: ${document.body.offsetHeight}`);
    getPrevItems();
    // window.scrollTo(0, oldScrollY);
  }
});
