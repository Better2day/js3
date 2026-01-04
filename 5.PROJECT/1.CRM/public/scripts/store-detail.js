document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const id = searchParams.get('id') || 1;

  renderStore(await getStoreDetail({ id }));
}

async function getStoreDetail({ id }) {
  const res = await fetch(`/api/stores/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const store = await res.json();

  return store ?? {};
};

// Store table 안에 상점 데이터 추가
function renderStore(store) {
  const storeTable = document.getElementById('store-table');
  const storeTheadTr = storeTable.querySelector('thead > tr');
  const storeTbody = storeTable.querySelector('tbody');

  storeTheadTr.innerHTML = '';
  storeTbody.innerHTML = '';

  if (store) {
    // table > thead 안에 상점 데이터 헤더 추가
    const tableHeaders = Object.keys(store);
    tableHeaders.forEach(header => {
      if (header != 'Id') {
        const th = document.createElement('th');
        th.textContent = header;
        storeTheadTr.appendChild(th);
      }
    })

    // table > tbody 안에 상점 데이터 추가
    const fragment = new DocumentFragment();
    const tr = document.createElement('tr');

    Object.entries(store).forEach(([key, val]) => {
      if (key != 'Id') {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      }
    })
    fragment.appendChild(tr);
    storeTbody.appendChild(fragment);
  } else {
    storeTbody.innerHTML = '<tr><td>상점 데이터가 없습니다.</td></tr>';
  }
};
