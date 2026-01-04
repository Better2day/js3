document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const id = searchParams.get('id') || 1;

  renderOrderitem(await getOrderitems({ id }));
}

async function getOrderitems({ id }) {
  const res = await fetch(`/api/orderitems/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const orderitem = await res.json();

  return orderitem ?? [];
};

// Orderitemitem table 안에 주문별 품목 데이터 추가
function renderOrderitem(orderitem) {
  const orderitemTable = document.getElementById('orderitem-table');
  const orderitemTheadTr = orderitemTable.querySelector('thead > tr');
  const orderitemTbody = orderitemTable.querySelector('tbody');

  orderitemTheadTr.innerHTML = '';
  orderitemTbody.innerHTML = '';

  if (orderitem) {
    // table > thead 안에 주문별 품목 데이터 헤더 추가
    const tableHeaders = Object.keys(orderitem);
    tableHeaders.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      orderitemTheadTr.appendChild(th);
    })

    // table > tbody 안에 주문별 품목 데이터 추가
    const fragment = new DocumentFragment();
    const tr = document.createElement('tr');

    Object.entries(orderitem).forEach(([key, val]) => {
      const td = document.createElement('td');
      if (key.includes('Id') && key != 'Id') { // OrderId, ItemId이면 그에 상응하는 링크 (API 루트) 생성
        td.innerHTML = `<a href="/${key.split('Id')[0].toLowerCase()}-detail?id=${val}">${val}</a>`;
      } else {
        td.textContent = val;
      }
      tr.appendChild(td);
    })
    fragment.appendChild(tr);
    orderitemTbody.appendChild(fragment);
  } else {
    orderitemTbody.innerHTML = '<tr><td>주문별 품목 데이터가 없습니다.</td></tr>';
  }
};
