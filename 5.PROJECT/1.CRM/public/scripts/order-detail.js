document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const id = searchParams.get('id') || 1;

  renderOrder(await getOrderDetail({ id }));
}

async function getOrderDetail({ id }) {
  const res = await fetch(`/api/orders/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const order = await res.json();

  return order ?? {};
};

// Order table 안에 주문 데이터 추가
function renderOrder(order) {
  const orderTable = document.getElementById('order-table');
  const orderTheadTr = orderTable.querySelector('thead > tr');
  const orderTbody = orderTable.querySelector('tbody');

  orderTheadTr.innerHTML = '';
  orderTbody.innerHTML = '';

  if (order) {
    // table > thead 안에 주문 데이터 헤더 추가
    const tableHeaders = Object.keys(order);
    tableHeaders.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      orderTheadTr.appendChild(th);
    })

    // table > tbody 안에 주문 데이터 추가
    const fragment = new DocumentFragment();
    const tr = document.createElement('tr');

    Object.entries(order).forEach(([key, val]) => {
      const td = document.createElement('td');
      if (key.includes('Id') && key != 'Id') { // StoreId, UserId이면 그에 상응하는 링크 (API 루트) 생성
        td.innerHTML = `<a href="/${key.split('Id')[0].toLowerCase()}-detail?id=${val}">${val}</a>`;
      } else {
        td.textContent = val;
      }
      tr.appendChild(td);
    })
    fragment.appendChild(tr);
    orderTbody.appendChild(fragment);
  } else {
    orderTbody.innerHTML = '<tr><td>주문 데이터가 없습니다.</td></tr>';
  }
};
