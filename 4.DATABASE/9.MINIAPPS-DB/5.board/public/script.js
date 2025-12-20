// 웹페이지 로딩시 메모 읽어오기
document.addEventListener('DOMContentLoaded', () => {
  const posts = readMemo();
});

const inputTitle = document.getElementById('input-title');
const inputText = document.getElementById('input-text');

function renderCard({ id, title, message }) {
  const cardList = document.getElementById('card-list');
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const titleSpan = document.createElement('span');
  titleSpan.innerHTML = `${title}&nbsp;`;

  const messageSpan = document.createElement('span');
  messageSpan.innerHTML += `${message}&nbsp;`;

  const updateBtn = document.createElement('button');
  updateBtn.textContent = '수정';
  updateBtn.classList.add('btn');
  updateBtn.classList.add('btn-primary');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-primary');
  deleteBtn.addEventListener('click', () => deleteMemo(id));

  cardDiv.appendChild(titleSpan);
  cardDiv.appendChild(messageSpan);
  cardDiv.appendChild(updateBtn);
  cardDiv.appendChild(deleteBtn);
  cardList.appendChild(cardDiv);
}

async function readMemo() {
  try {
    const res = await fetch('/api/list');
    const posts = await res.json();

    if (posts) {
      posts.forEach(post => renderCard(post));
    }
  } catch (error) {
    console.log(error);
  }
}

// function createMemo(Title, Content) {
async function createMemo() {
  const title = inputTitle.value;
  const message = inputText.value;

  console.log(`${title} ${message}`);

  const article = { title, message };
  try {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
    const post = await res.json();

    if (post) {
      renderCard(post);
    }
  } catch (error) {
    console.log('메모 저장 중 오류 발생: ', error);
  }
}

async function deleteMemo(id) {
  try {
    const res = await fetch(`/api/delete/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (result?.changes == 1) {
      location.reload();
    }
  } catch (error) {
    console.log('메모 삭제 중 오류 발생: ', error);
  }
}

async function updatedMemo(id, title, message) {
  console.log(id);
  try {
    const res = await fetch(`/api/modify/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message })
    });
    const result = await res.json();

    if (result?.changes == 1) {
      location.reload();
    }
  } catch (error) {
    console.log('메모 수정 중 오류 발생: ', error);
  }
}
