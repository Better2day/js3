const PAGE_SIZE = 20;

document.addEventListener('DOMContentLoaded', () => {
  // console.log(document.URL);
  // new URL(document.URL).search // queryParameter 전체
  loadData();
});

// async function loadData() {
async function loadData(url = '') {
  // const searchParams = (url != '') ? new URL(url).searchParams : new URL(document.URL).searchParams;
  // const searchParams = new URL(url != '' ? url : document.URL).searchParams;
  const searchParams = new URL(url || document.URL).searchParams;
  const name = searchParams.get('name') || '';
  const gender = searchParams.get('gender') || '';
  const page = searchParams.get('page') ?? 1;
  console.log('page: ', page);
  console.log('name: ', name);
  console.log('gender: ', gender);

  // title에 페이지 번호를 적어서, 브라우저 히스토리를 통한 편리한 이동이 가능하도록 함
  document.title = `CRM Users - page ${page}`;

  const [users, userCount] = await Promise.all([
    getUsers({ name, gender, page }),
    getUserCount({ name, gender })]);

  renderUsers(users);
  renderPagination({
    // items: users,
    name: name,
    gender: gender,
    page: page,
    pageSize: PAGE_SIZE,
    totalCount: userCount
  });
}

// async function getUsers(page = 1) {
async function getUsers({ name, gender, page }) {
  // const res = await fetch(`/api/users?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&page=${page}`);
  const res = await fetch(`/api/users?name=${name}&gender=${gender}&page=${page}`);
  const users = await res.json();

  return users ?? [];
};

async function getUserCount({ name, gender }) {
  // const res = await fetch(`/api/users/count?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}`);
  const res = await fetch(`/api/users/count?name=${name}&gender=${gender}`);
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
    const fragment = new DocumentFragment(); // reflow 한 번으로 줄이도록 프래그먼트 이용
    users.forEach(user => {
      const tr = document.createElement('tr');

      Object.entries(user).forEach(([key, val]) => {
        if (key != 'Address') {
          const td = document.createElement('td');
          td.textContent = val;
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
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');

    // li.innerHTML = `<a href="/users?page=${i}">${i}</a>`;
    const queryParams = `name=${name}&gender=${gender}&page=${i}`;
    li.innerHTML = `<a href="/users?${queryParams}"><span>${i}</span></a>`;
    // li.innerHTML = `<a href="/users?name=${name}&gender=${gender}&page=${i}">${i}</a>`;

    fragment.appendChild(li);
  }
  ul.appendChild(fragment);

  // console.log(a.href);
  // console.log(new URL(a.href).search);
  // console.log((new URL(a.href).search).split('?').pop());
  // if (totalCound > 0) {
  // }
}

// Event Delegation을 통해서 페이지네이션 ul 한 개에만 이벤트 리스너 추가
document.getElementById('pagination').querySelector('ul').addEventListener('click', e => {
  console.log('ul click event handler');
  // if (e.target == 'a') {
  // 문자열 'a'와 비교는 불가능. 하려면 e.target.tagName === 'a'로 비교해야 함
  // 그런데 이럴 경우 <a href="URL"><span>1</span></a> 식으로 코드를 변경할 경우, target이 span이 되서 코드가 정상 작동하지 않게 됨
  // 그래서 아래처럼 Element: closest() method를 통해서 이벤트 발생 target부터 부모 방향으로 거슬러 올라가면서 a 태그를 찾아야 한다.
  const a = e.target.closest('a');
  if (!a) return;

  e.preventDefault();
  e.stopPropagation();
  loadData(new URL(a.href));
})
