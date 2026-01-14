const searchBtn = document.getElementById('searchBtn');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  search();
});

const results = document.getElementById('results');

async function search() {
  const query = document.getElementById('query').value.trim();
  if (!query) return;

  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${currentPage}&display=${NUM_OF_ITEMS_PER_PAGE}`);
  const data = await res.json();

  results.innerHTML = '<li>로딩중...</li>';
  console.log(data);
  // console.log(data.total, data.display);

  // renderResults({ data: data.items });
  renderResults({ data });

  renderPagination({ total: data.total, pageSize: data.display });
}

function renderResults({ data }) {

  results.innerHTML = '';
  results.innerHTML = `<strong>검색 결과 수: ${data.total}</strong>`;

  // console.log(results);

  if (data.items && data.items.length > 0) {
    const fragment = new DocumentFragment();
    data.items.forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `
      <strong><a href="${article.link}" target="_blank">제목: ${article.title}</a></strong>
      <p>${article.description}</p>
      <p><small>포스팅 일자: ${article.postdate}</small></p>
      `;
      fragment.appendChild(li);
    })

    document.getElementById('results').appendChild(fragment);
  }
}

let currentPage = 1;
const MAX_PAGE_NUM = 10;
const NUM_OF_ITEMS_PER_PAGE = 10;

// pageSize

function renderPagination({ total, pageSize }) {
  const totalNavItems = Math.min(MAX_PAGE_NUM, Math.ceil(total / NUM_OF_ITEMS_PER_PAGE));
  const totalPages = Math.floor(total / pageSize);

  console.log('renderPagination 안');
  console.log('totalNavItems:', totalNavItems);
  console.log('total:', total);
  console.log('pageSize:', pageSize);
  console.log('totalPages:', totalPages);
  totalPages

  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  paginationDiv.appendChild(createButton("<<", 1, currentPage === 1));
  paginationDiv.appendChild(createButton("<", currentPage - 1, currentPage === 1));

  for (let p = 1; p <= totalNavItems; p++) {
    paginationDiv.appendChild(createButton(p, p, false));
  }

  paginationDiv.appendChild(createButton(">", currentPage + 1, currentPage === totalPages));
  paginationDiv.appendChild(createButton(">>", totalPages, currentPage === totalPages));



  // const fragment = new DocumentFragment();

  // for (let i = 0; i < pageSize; i++) {
  //   const span = document.createElement('span')
  //   span.innerHTML = `<a href="/api/search?query=${encodeURIComponent(query)}?">${i + 1}</a>`;
  //   fragment.appendChild(span);
  // }

  // paginationDiv.appendChild(fragment);
}

function createButton(label, page, disabled) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.disabled = disabled;

  if (page === currentPage) {
    btn.style.fontWeight = 'bold';
  }

  btn.addEventListener('click', () => {
    currentPage = page;
    search();
    // console.log('버튼 클릭됨: ', currentPage);
  });

  return btn;
}
