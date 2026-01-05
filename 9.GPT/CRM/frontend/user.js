
const API = 'http://localhost:3000/api/users';
let currentPage = 1;

async function load(page=1) {
  currentPage = page;
  const res = await fetch(`${API}?page=${page}`);
  const { data, total, pageSize } = await res.json();

  const tbody = document.getElementById('body');
  tbody.innerHTML = '';
  data.forEach(u => {
    tbody.innerHTML += `<tr>
      <td>${u.Id}</td><td>${u.Name}</td><td>${u.Gender}</td>
      <td>${u.Age}</td><td>${u.Birthdate}</td></tr>`;
  });

  renderPagination(total, pageSize);
}

function renderPagination(total, pageSize) {
  const pageCount = Math.ceil(total / pageSize);
  const group = Math.floor((currentPage-1)/10);
  const start = group*10 + 1;
  const end = Math.min(start+9, pageCount);

  const ul = document.getElementById('pagination');
  ul.innerHTML = '';

  add('<<', 1);
  add('<', Math.max(start-1,1));

  for(let i=start;i<=end;i++) add(i,i,true);

  add('>', Math.min(end+1,pageCount));
  add('>>', pageCount);

  function add(label, page, numeric=false) {
    const li = document.createElement('li');
    li.className = 'page-item ' + (page===currentPage && numeric ? 'active':'');
    li.innerHTML = `<a class="page-link">${label}</a>`;
    li.onclick = () => load(page);
    ul.appendChild(li);
  }
}

load();
