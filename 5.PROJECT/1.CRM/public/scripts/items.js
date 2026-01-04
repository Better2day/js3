const PAGE_SIZE = 20;
const NAV_SIZE = 10;

document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData(url = '') {
  const searchParams = new URL(url || document.URL).searchParams;
  const page = searchParams.get('page') || 1;

  // title에 페이지 번호를 적어서, 브라우저 히스토리를 통한 편리한 이동이 가능하도록 함
  document.title = `CRM Items - page ${page}`;

  const [items, itemCount] = await Promise.all([
    getItems({ page }),
    getItemCount()
  ]);

  renderItems(items);
  renderPagination({
    page: page,
    pageSize: PAGE_SIZE,
    totalCount: itemCount
  });
}

async function getItems({ page }) {
  const res = await fetch(`/api/items?page=${page}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const items = await res.json();

  return items ?? [];
};

async function getItemCount() {
  const res = await fetch(`/api/items/count`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error) || 'HTTP Request failed';
  }
  const itemCount = await res.json();

  return itemCount ?? 0;
};

// Item table 안에 품목 데이터 추가
function renderItems(items) {
  const itemTable = document.getElementById('item-table');
  const itemTheadTr = itemTable.querySelector('thead > tr');
  const itemTbody = itemTable.querySelector('tbody');

  itemTheadTr.innerHTML = '';
  itemTbody.innerHTML = '';

  if (items.length > 0) {
    // table > thead 안에 품목 데이터 헤더 추가
    const tableHeaders = Object.keys(items[0]);
    tableHeaders.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      itemTheadTr.appendChild(th);
    })

    // table > tbody 안에 품목 데이터 추가
    const fragment = new DocumentFragment();
    items.forEach(item => {
      const tr = document.createElement('tr');

      Object.entries(item).forEach(([key, val]) => {
        const td = document.createElement('td');
        td.innerHTML = (key != 'Id') ? val : `<a href="/item-detail?id=${val}">${val}</a>`;
        tr.appendChild(td);
      })
      fragment.appendChild(tr);
    })
    itemTbody.appendChild(fragment);
  } else {
    itemTbody.innerHTML = '<tr><td>품목 데이터가 없습니다.</td></tr>';
  }
};

// 페이지네이션
function renderPagination({ page = 1, pageSize, totalCount }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pagination = document.getElementById('pagination');
  const ul = pagination.querySelector('ul');
  ul.textContent = '';
  const fragment = new DocumentFragment();

  const baseURL = '<a href="/items';
  // 이전 페이지와 다음 페이지를 계산하기 위해 이용할 값 ((페이지 그룹에서 제일 작은 페이지 - 1) / 10 )
  const pageTenth = Math.floor((page - 1) / 10);

  if (page > 10) {
    // 첫 페이지
    const liForFirstPage = document.createElement('li');
    liForFirstPage.classList.add('page-item');
    liForFirstPage.innerHTML = `${baseURL}?page=1" class="page-link"><<</a>`;
    fragment.appendChild(liForFirstPage);
    // 이전 페이지 (페이지 그룹에서 제일 작은 페이지 - 1)
    const liForPrevPage = document.createElement('li');
    liForPrevPage.classList.add('page-item');
    const prevPage = NAV_SIZE * pageTenth;
    liForPrevPage.innerHTML = `${baseURL}?page=${prevPage}" class="page-link"><</a>`;
    fragment.appendChild(liForPrevPage);
  }

  // const li = document.createElement('li');

  // 가운데 보일 페이지 그룹 (min(totalPage, 10개 페이지))
  for (let i = (NAV_SIZE * pageTenth) + 1; i <= Math.min(totalPages, NAV_SIZE * (pageTenth + 1)); i++) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    if (i == page) li.classList.add('active');
    li.innerHTML = `${baseURL}?page=${i}" class="page-link">${i}</a>`;

    fragment.appendChild(li);
  }

  if (totalPages > 10 && NAV_SIZE * (pageTenth + 1) < totalPages) {
    // 다음 페이지 (가운데 있는 10개 페이지 중 최댓값 + 1))
    const liForNextPage = document.createElement('li');
    liForNextPage.classList.add('page-item');
    const nextPage = NAV_SIZE * (pageTenth + 1) + 1;
    liForNextPage.innerHTML = `${baseURL}?page=${nextPage}" class="page-link">></a>`;
    fragment.appendChild(liForNextPage);
    // 마지막 페이지
    const liForLastPage = document.createElement('li');
    liForLastPage.classList.add('page-item');
    liForLastPage.innerHTML = `${baseURL}?page=${totalPages}" class="page-link">>></a>`;
    fragment.appendChild(liForLastPage);
  }

  ul.appendChild(fragment);
}

// (Event Delegation) 페이지네이션 ul 한 개에만 페이지 링크 클릭시 처리할 이벤트 리스너 추가
document.getElementById('pagination').querySelector('ul').addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a) return;

  e.preventDefault();
  e.stopPropagation();

  // 사용자가 뒤로/앞으로 가기 버튼을 눌러서 이동할 때 상태 복원을 위해서 히스토리 저장
  history.pushState({}, '', new URL(a.href).search);

  loadData(a.href);
})

// 사용자가 웹브라우저에서 뒤로/앞으로 가기 버튼을 눌렀을 때 이벤트 처리
window.addEventListener('popstate', () => {
  loadData(location.href);
});
