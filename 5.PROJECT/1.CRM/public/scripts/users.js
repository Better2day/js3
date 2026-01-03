const PAGE_SIZE = 20;

document.addEventListener('DOMContentLoaded', async () => {
  // console.log(document.URL);
  // new URL(document.URL).search // queryParameter 전체
  const searchParams = new URL(document.URL).searchParams;
  const name = searchParams.get('name') || '';
  const gender = searchParams.get('gender') || '';
  const page = searchParams.get('page') ?? 1;
  // const page = searchParams.get('page');
  console.log('page: ', page);
  console.log('typeof page: ', typeof page);

  // title에 페이지 번호를 적어서, 브라우저 히스토리를 통한 편리한 이동이 가능하도록 함
  document.title = `CRM Users - page ${page}`;

  const [users, userCount] = await Promise.all([
    getUsers({ q: name, gender, page }),
    getUserCount({ q: name, gender })]);

  renderUsers(users);
  renderPagination({
    items: users,
    page: page,
    pageSize: PAGE_SIZE,
    totalCount: userCount
  });
});

// async function getUsers(page = 1) {
async function getUsers({ q, gender, page }) {
  const res = await fetch(`/api/users?page=${page}`);
  const users = await res.json();

  return users ?? [];
};

async function getUserCount() {
  const res = await fetch('/api/users/count');
  const userCount = await res.json();

  return userCount ?? 0;
};


// User table 안에 사용자 데이터 추가
function renderUsers(users) {
  const userTable = document.getElementById('user-table');
  const userTheadTr = userTable.querySelector('thead > tr');
  const userTbody = userTable.querySelector('tbody');

  // userTheadTr.textContent = '';
  // userTbody.textContent = '';

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
    users.forEach(user => {
      const tr = document.createElement('tr');

      Object.entries(user).forEach(([key, val]) => {
        if (key != 'Address') {
          const td = document.createElement('td');
          td.textContent = val;
          tr.appendChild(td);
        }
      })
      userTbody.appendChild(tr);
    })
  } else {
    userTbody.innerHTML = '<tr><td>사용자 데이터가 없습니다.</td></tr>';
  }
};

// 페이지네이션
function renderPagination({ items, page = 1, pageSize, totalCount }) {

  const totalPages = Math.ceil(totalCount / pageSize);

  const nav = document.getElementById('pagination');
  const ul = nav.querySelector('ul');
  ul.textContent = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');

    li.innerHTML = `<a href="/users?page=${i}">${i}</a>`;
    ul.appendChild(li);
  }
  // if (totalCound > 0) {
  // }
}
