document.addEventListener('DOMContentLoaded', getUsers);

async function getUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();

  if (users) {
    renderUsers(users);
  }
};

function renderUsers(users) {
  const userTable = document.getElementById('user-table');
  const userTheadTr = userTable.querySelector('thead > tr');
  const userTbody = userTable.querySelector('tbody');

  if (users.length > 0) {
    // table → thead 안에 사용자 데이터 헤더 추가
    const tableHeaders = Object.keys(users[0]);
    tableHeaders.forEach(header => {
      if (header != 'Address') {
        const th = document.createElement('th');
        th.textContent = header;
        userTheadTr.appendChild(th);
      }
    })

    // table → tbody 안에 사용자 데이터 추가
    users.forEach(user => {
      const tr = document.createElement('tr');
      // console.log(Object.entries(user));

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
