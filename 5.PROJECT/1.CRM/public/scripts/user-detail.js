document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const id = searchParams.get('id') || '';

  renderUser(await getUserDetail({ id }));
}

async function getUserDetail({ id }) {
  const res = await fetch(`/api/users/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const user = await res.json();

  return user ?? {};
};

// User table 안에 사용자 데이터 추가
function renderUser(user) {
  const userTable = document.getElementById('user-table');
  const userTheadTr = userTable.querySelector('thead > tr');
  const userTbody = userTable.querySelector('tbody');

  userTheadTr.innerHTML = '';
  userTbody.innerHTML = '';

  if (user) {
    // table > thead 안에 사용자 데이터 헤더 추가
    const tableHeaders = Object.keys(user);
    tableHeaders.forEach(header => {
      if (header != 'Id') {
        const th = document.createElement('th');
        th.textContent = header;
        userTheadTr.appendChild(th);
      }
    })

    // table > tbody 안에 사용자 데이터 추가
    const fragment = new DocumentFragment(); // reflow 최소화하려고 프래그먼트 이용
    const tr = document.createElement('tr');

    Object.entries(user).forEach(([key, val]) => {
      if (key != 'Id') {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      }
    })
    fragment.appendChild(tr);
    userTbody.appendChild(fragment);
  } else {
    userTbody.innerHTML = '<tr><td>사용자 데이터가 없습니다.</td></tr>';
  }
};
