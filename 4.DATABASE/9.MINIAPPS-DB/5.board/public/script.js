
// 1. 이 페이지가 로딩
document.addEventListener('DOMContentLoaded', () => {
  // fetch (게시판 글)
  //  .then(카드 만들기)
  const posts = readPost();
});

const inputTitle = document.getElementById('input-title');
const inputText = document.getElementById('input-text');

// inputTitle.addEventListener('click')


function renderCard({ id, title, message }) {
  // DOM 가져오기
  // DOM Element 생성
  // 생성한 요소를 기존에 있던 DOM에 자식으로 추가
  const cardList = document.getElementById('card-list');
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  // const titleDiv = document.createElement('div');
  // const messageDiv = document.createElement('div');
  // messageDiv.innerHTML += `${message}&nbsp;`;
  const titleSpan = document.createElement('span');
  titleSpan.innerHTML = `${title}&nbsp;`;
  const messageSpan = document.createElement('span');
  messageSpan.innerHTML += `${message}&nbsp;`;
  // cardList.appendChild(`${titleDiv}<br>${messageDiv}`);
  const updateBtn = document.createElement('button');
  updateBtn.textContent = '수정';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  cardDiv.appendChild(titleSpan);
  cardDiv.appendChild(messageSpan);
  cardDiv.appendChild(updateBtn);
  cardDiv.appendChild(deleteBtn);
  cardList.appendChild(cardDiv);
}

// .get('/api/list'
async function readPost() {
  const res = await fetch('/api/list');
  const posts = await res.json();

  console.log(typeof posts);
  console.log(posts);
  if (posts) {
    posts.forEach(post => renderCard(post));
  }
}

// .post('/api/create'
// function uploadPost(Title, Content) {
async function uploadPost() {
  const title = inputTitle.value;
  const message = inputText.value;

  console.log(`${title} ${message}`);

  const article = { title, message };
  const res = await fetch('/api/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article)
  });
  const post = await res.json();

  if (post) {
    renderCard(post);
  }

  // DOM에서 입력한 내용 가져오기
  // fetch를 통해서 BE API의 글쓰기 경로에 글쓰기 요청
  // fetch(글쓰기)
  //   .then(성공 확인)
  //   .then(불러오기(=카드 만들기))
}

// .delete('/api/delete'
async function deletePost(Title, Content) {
  // DOM에서 입력한 내용 가져오기
  // fetch를 통해서 BE API의 글쓰기 경로에 글쓰기 요청
  // fetch(글쓰기)
  //   .then(성공 확인)
  //   .then(불러오기(=카드 만들기))
}

// .put('/api/modify'
async function updatedPost(Title, Content) {
  // DOM에서 입력한 내용 가져오기
  // 기존에 글이 보이던 요소를, 글을 입력할 수 있는 요소로 변경
  // 저장을 누르면? 다시 글을 보여주는 요소로 변경
  // fetch를 통해서 BE API의 글쓰기 경로에 글쓰기 요청
  // fetch(글쓰기)
  //   .then(성공 확인)
  //   .then(불러오기(=카드 만들기))

  // const id =
  console.log(id);

  const res = await fetch('/api/delete/:id', { method: 'DELETE' });
  const post = await res.json();

}
