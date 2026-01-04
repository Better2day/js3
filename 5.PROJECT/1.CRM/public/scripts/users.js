const PAGE_SIZE = 20;
const NAV_SIZE = 10;

document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const name = searchParams.get('name') || '';
  const gender = searchParams.get('gender') || '';
  const page = searchParams.get('page') || 1;

  // title에 페이지 번호를 적어서, 브라우저 히스토리를 통한 편리한 이동이 가능하도록 함
  document.title = `CRM Users - page ${page}`;

  const [users, userCount] = await Promise.all([
    getUsers({ name, gender, page }),
    getUserCount({ name, gender })
  ]);

  renderUsers(users);
  renderPagination({
    // items: users,
    // 페이지네이션을 모듈화할 경우 아래처럼 일일이 관련 속성 값을 넘겨주는 것보다
    // 위처럼 객체를 넘겨주고 모듈 안에서 처리하는 게 나을지 생각해봐야 한다.
    name: name,
    gender: gender,
    page: page,
    pageSize: PAGE_SIZE,
    totalCount: userCount
  });
}

// async function getUsers(page = 1) {
async function getUsers({ name, gender, page }) {
  // 현재 내 개발 환경에서는 encodeURIComponent 처리를 하지 않아도 정상 작동 (최신 브라우저에서는 자동으로 UTF-8로 처리해서 그런 듯)
  // 하지만 다른 환경에서 쿼리 파라미터에 CJK가 들어가거나, &, ?, = 같은 특수문자 포함시 오류가 발생할 수 있다고 하니 처리하는 게 정석
  // const res = await fetch(`/api/users?name=${name}&gender=${gender}&page=${page}`);
  const res = await fetch(`/api/users?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&page=${page}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const users = await res.json();

  return users ?? [];
};

async function getUserCount({ name, gender }) {
  const res = await fetch(`/api/users/count?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const userCount = await res.json();

  return userCount ?? 0;
};

// User table 안에 사용자 데이터 추가
function renderUsers(users) {
  const userTable = document.getElementById('user-table');
  const userTheadTr = userTable.querySelector('thead > tr');
  const userTbody = userTable.querySelector('tbody');

  userTheadTr.innerHTML = '';
  userTbody.innerHTML = '';

  if (users.length > 0) {
    // table > thead 안에 사용자 데이터 헤더 추가
    const tableHeaders = Object.keys(users[0]);
    tableHeaders.forEach(header => {
      if (header != 'Address') {
        const th = document.createElement('th');
        th.textContent = header;
        userTheadTr.appendChild(th);
      }
    })

    // table > tbody 안에 사용자 데이터 추가
    const fragment = new DocumentFragment(); // reflow 최소화하려고 프래그먼트 이용
    users.forEach(user => {
      const tr = document.createElement('tr');

      Object.entries(user).forEach(([key, val]) => {
        if (key != 'Address') {
          const td = document.createElement('td');
          td.innerHTML = (key != 'Id') ? val : `<a href="/user-detail?id=${val}">${val}</a>`;
          tr.appendChild(td);
        }
      })
      fragment.appendChild(tr);
    })
    userTbody.appendChild(fragment);
  } else {
    userTbody.innerHTML = '<tr><td>사용자 데이터가 없습니다.</td></tr>';
  }
};

// 페이지네이션
function renderPagination({ name, gender, page = 1, pageSize, totalCount }) {
  // function renderPagination({ items, page = 1, pageSize, totalCount }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pagination = document.getElementById('pagination');
  const ul = pagination.querySelector('ul');
  ul.textContent = '';
  const fragment = new DocumentFragment();

  const baseURL = `<a href="/users?name=${name}&gender=${gender}`;
  // 이전 페이지와 다음 페이지를 계산하기 위해 이용할 값 ((페이지 그룹에서 제일 작은 페이지 - 1) / 10 )
  const pageTenth = Math.floor((page - 1) / 10);

  if (page > 10) {
    // 첫 페이지
    const liForFirstPage = document.createElement('li');
    liForFirstPage.classList.add('page-item');
    liForFirstPage.innerHTML = `${baseURL}&page=1" class="page-link"><<</a>`;
    fragment.appendChild(liForFirstPage);
    // 이전 페이지 (페이지 그룹에서 제일 작은 페이지 - 1)
    const liForPrevPage = document.createElement('li');
    liForPrevPage.classList.add('page-item');
    const prevPage = NAV_SIZE * pageTenth;
    liForPrevPage.innerHTML = `${baseURL}&page=${prevPage}" class="page-link"><</a>`;
    fragment.appendChild(liForPrevPage);
  }

  // const li = document.createElement('li');

  // 가운데 보일 페이지 그룹 (min(totalPage, 10개 페이지))
  for (let i = (NAV_SIZE * pageTenth) + 1; i <= Math.min(totalPages, NAV_SIZE * (pageTenth + 1)); i++) {
    const li = document.createElement('li');
    li.classList.add('page-item'); // Bootstrap styling 적용
    if (i == page) li.classList.add('active'); // BS - 현재 페이지 아이템 강조
    li.innerHTML = `${baseURL}&page=${i}" class="page-link">${i}</a>`;
    // li.innerHTML = `${baseURL}&page=${i}"><span>${i}</span></a>`;

    fragment.appendChild(li);
  }

  if (totalPages > 10 && NAV_SIZE * (pageTenth + 1) < totalPages) {
    // 다음 페이지 (가운데 있는 10개 페이지 중 최댓값 + 1))
    const liForNextPage = document.createElement('li');
    liForNextPage.classList.add('page-item');
    const nextPage = NAV_SIZE * (pageTenth + 1) + 1;
    liForNextPage.innerHTML = `${baseURL}&page=${nextPage}" class="page-link">></a>`;
    fragment.appendChild(liForNextPage);
    // 마지막 페이지
    const liForLastPage = document.createElement('li');
    liForLastPage.classList.add('page-item');
    liForLastPage.innerHTML = `${baseURL}&page=${totalPages}" class="page-link">>></a>`;
    fragment.appendChild(liForLastPage);
  }

  ul.appendChild(fragment);

  // if (totalCound > 0) {
  // }
}

// (Event Delegation) 페이지네이션 ul 한 개에만 페이지 링크 클릭시 처리할 이벤트 리스너 추가
document.getElementById('pagination').querySelector('ul').addEventListener('click', e => {
  // if (e.target == 'a') {
  // 문자열 'a'와 비교는 불가능. 하려면 e.target.tagName === 'a'로 비교해야 함
  // 그런데 이럴 경우 <a href="URL"><span>1</span></a> 식으로 코드를 변경할 경우, target이 span이 되서 코드가 정상 작동하지 않게 됨
  // 그래서 아래처럼 Element: closest() method를 통해서 이벤트 발생 target부터 부모 방향으로 거슬러 올라가면서 a 태그를 찾아야 한다.
  const a = e.target.closest('a');
  if (!a) return;

  e.preventDefault();
  e.stopPropagation();

  // 사용자가 뒤로/앞으로 가기 버튼을 눌러서 이동할 때 상태 복원을 위해서 히스토리 저장
  history.pushState({}, '', new URL(a.href).search);
  // history.pushState({}, '', a.href); // 이것도 별 문제 없지만, 위 방식이 조금 더 많은 정보를 넘겨줌

  // URL, 쿼리 파라미터 내용만으로 과거 상태를 다 복원(저장)할 수 없는 경우 (예: 정렬 옵션, UI 열림/닫힘 상태 등)
  // 관련 정보를 state 객체에 저장하고, 이 정보를 상태를 복원하는 함수를 새로 만들면 더 나은 복원이 가능하다.
  // const searchParams = new URL(a.href).searchParams;
  // history.pushState({
  //   name: searchParams.get('name') || '',
  //   gender: searchParams.get('gender') || '',
  //   page: searchParams.get('page') ?? 1
  // }, '', new URL(a.href).search);

  loadData(a.href);
})

// 사용자가 웹브라우저에서 뒤로/앞으로 가기 버튼을 눌렀을 때 이벤트 처리
window.addEventListener('popstate', () => {
  loadData(location.href);
});

document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;

  history.pushState({}, '', `?name=${name}&gender=${gender}`);

  loadData(`http://127.0.0.1:3000/users?name=${name}&gender=${gender}`);
});
