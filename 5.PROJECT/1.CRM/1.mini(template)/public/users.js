document.addEventListener('DOMContentLoaded', () => {
  // 검색 버튼 활성화
  const searchBtn = document.getElementById('search-button');
  const searchName = document.getElementById('search-name');

  searchBtn.addEventListener('click', () => {
    fetchUsers(searchName.value);
  })

  // 사용자 가져오기
  // 검색어가 있든 없든 한 함수로 처리하기 위해서, 검색어가 없을 때는 빈 값을 넣어줌
  // 그런데 굳이 이렇게 하는 것보다 아래 함수에서 기본값을 주는 게 나을 듯?
  // fetchUsers('');
  fetchUsers();
});

function fetchUsers(name = '') {
  const queryString = `?name=${encodeURIComponent(name)}&page=1`;
  console.log(queryString);

  fetch(`/api/users${queryString}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // 테이블에 렌더링
      renderTable(data.data);

      // Pagination 렌더링
      renderPagination(data.totalPages);
    });
}

// function fetchUsers() {
//   fetch('/api/users')
//     .then(response => response.json())
//     .then(data => {
//       // console.log(data);
//       // 테이블에 렌더링
//       renderTable(data);
//     })
// }

function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');

  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `${i} `;
  }
}

function renderTable(data) {
  // console.log(data.length);

  const tableHeader = document.getElementById('table-header');
  const tableBody = document.getElementById('table-body');

  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  if (data.length > 0) {
    // 1. 테이블 헤더 생성
    // 첫 번째 요소를 가져오고, 그 안의 key를 뽑아내서 tr/th 렌더링
    // console.log(data[0]);
    // console.log(Object.keys(data[0]));
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      // if (!['Address', 'Id'].includes(h)) {
      if (h != 'Address') {
        const one_th = document.createElement('th');
        one_th.textContent = h;
        headerRow.appendChild(one_th);
      }
    })

    tableHeader.appendChild(headerRow);
    // const th = document.createElement('th');

    // 2. 테이블 바디 생성
    // 리스트만큼 돌면서 tr/td를 렌더링
    data.forEach(row => {
      const bodyRow = document.createElement('tr');

      bodyRow.addEventListener('click', () => {
        // 브라우저 창에 URL을 넣어서 이동하는 방법
        window.location = `/users/${row.Id}`;
      });

      for (const [key, value] of Object.entries(row)) {
        if (key == 'Address') {
          break;
        }

        const one_td = document.createElement('td');
        // if (key == 'Id') {
        //   one_td.innerHTML(`<a href="#">${value}</a>`);
        // } else {}
        one_td.textContent = value;
        bodyRow.appendChild(one_td);

      }
      tableBody.appendChild(bodyRow);
    })

  } else {
    tableBody.innerHTML = '----- 표시할 데이터가 없습니다. -----';
  }
}
