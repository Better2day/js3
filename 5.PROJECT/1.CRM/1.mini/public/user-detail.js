
const userId = window.location.pathname.split('/').pop();
// const userId = window.location.pathname.split('/').slice(-1);
console.log(userId);

function fetchUserDetail() {
  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderTable(data);
    })
}

fetchUserDetail();

function renderTable(data) {
  const tableHeader = document.getElementById('table-header');
  const tableBody = document.getElementById('table-body');

  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  if (data) {
    // 1. 테이블 헤더 생성
    const headers = Object.keys(data);
    const headerRow = document.createElement('tr');

    headers.forEach(h => {
      const one_th = document.createElement('th');
      one_th.textContent = h;
      headerRow.appendChild(one_th);
    })

    tableHeader.appendChild(headerRow);

    // 2. 테이블 바디 생성
    const bodyRow = document.createElement('tr');

    for (const value of Object.values(data)) {
      const one_td = document.createElement('td');
      one_td.textContent = value;
      bodyRow.appendChild(one_td);
    }

    tableBody.appendChild(bodyRow);
  }
}