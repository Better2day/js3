document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const id = searchParams.get('id') || 1;

  renderItem(await getItemDetail({ id }));
}

async function getItemDetail({ id }) {
  const res = await fetch(`/api/items/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const item = await res.json();

  return item ?? {};
};

// Item table 안에 품목 데이터 추가
function renderItem(item) {
  const itemTable = document.getElementById('item-table');
  const itemTheadTr = itemTable.querySelector('thead > tr');
  const itemTbody = itemTable.querySelector('tbody');

  itemTheadTr.innerHTML = '';
  itemTbody.innerHTML = '';

  if (item) {
    // table > thead 안에 품목 데이터 헤더 추가
    const tableHeaders = Object.keys(item);
    tableHeaders.forEach(header => {
      if (header != 'Id') {
        const th = document.createElement('th');
        th.textContent = header;
        itemTheadTr.appendChild(th);
      }
    })

    // table > tbody 안에 품목 데이터 추가
    const fragment = new DocumentFragment();
    const tr = document.createElement('tr');

    Object.entries(item).forEach(([key, val]) => {
      if (key != 'Id') {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      }
    })
    fragment.appendChild(tr);
    itemTbody.appendChild(fragment);
  } else {
    itemTbody.innerHTML = '<tr><td>품목 데이터가 없습니다.</td></tr>';
  }
};
