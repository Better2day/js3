document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const id = searchParams.get('id') || '';

  renderUser(await getUserDetail({ id }));
  renderOrders(await getOrderForUser({ id }));

  /* 
  const [user, orders] = await Promise.all([
    getUserDetail({ id }),
    getOrders({ id })
  ]);

  renderUser(user);
  renderOrders(orders);
  */
}

// 사용자 상세 정보
async function getUserDetail({ id }) {
  const res = await fetch(`/api/users/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const user = await res.json();

  return user ?? {};
};

// 사용자 주문 정보
async function getOrderForUser({ id }) {
  const res = await fetch(`/api/users/${id}/orders`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const orders = await res.json();

  return orders ?? [];
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

// Order table 안에 사용자의 주문 데이터 추가
function renderOrders(orders) {
  const orderTable = document.getElementById('order-table');
  const orderTheadTr = orderTable.querySelector('thead > tr');
  const orderTbody = orderTable.querySelector('tbody');

  orderTheadTr.innerHTML = '';
  orderTbody.innerHTML = '';

  if (orders.length > 0) {
    // table > thead 안에 주문 데이터 헤더 추가
    const tableHeaders = Object.keys(orders[0]);
    tableHeaders.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      orderTheadTr.appendChild(th);
    })

    // table > tbody 안에 주문 데이터 추가
    const fragment = new DocumentFragment();
    orders.forEach(order => {
      const tr = document.createElement('tr');

      Object.entries(order).forEach(([key, val]) => {
        const td = document.createElement('td');
        if (key.includes('Id')) { // OrderId, StoreId이면 그에 상응하는 링크 (API 루트) 생성
          td.innerHTML = `<a href="/${key.split('Id')[0].toLowerCase()}-detail?id=${val}">${val}</a>`;
        } else {
          td.textContent = val;
        }
        tr.appendChild(td);
      })
      fragment.appendChild(tr);
    })
    orderTbody.appendChild(fragment);
  } else {
    orderTbody.innerHTML = '<tr><td>주문 데이터가 없습니다.</td></tr>';
  }
};
