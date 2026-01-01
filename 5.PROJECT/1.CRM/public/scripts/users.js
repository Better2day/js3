const PAGE_SIZE = 20;

document.addEventListener('DOMContentLoaded', async () => {
  const users = await getUsers();
  renderUsers(users);

  // const userCount = await getUserCount();

  renderPagination({
    items: users,
    page: 1,
    pageSize: PAGE_SIZE,
    totalCount: await getUserCount()
  });
});

async function getUsers() {
  const res = await fetch('/api/users');
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
  // console.log(totalPages);

  const nav = document.getElementById('pagination');
  nav.textContent = '';

  for (let i = 1; i <= totalPages; i++) {
    nav.textContent += i + ' ';
  }
  // if (totalCound > 0) {
  // }
}
