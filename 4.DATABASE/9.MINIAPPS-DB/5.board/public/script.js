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
  titleSpan.innerHTML = title;
  titleSpan.classList.add('for-view');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.value = title;
  titleInput.classList.add('for-edit');

  const messageSpan = document.createElement('span');
  messageSpan.innerHTML += message;
  messageSpan.classList.add('for-view');
  const messageInput = document.createElement('input');
  messageInput.setAttribute('type', 'text');
  messageInput.value = message;
  messageInput.classList.add('for-edit');

  const updateBtn = document.createElement('button');
  updateBtn.textContent = '수정';
  updateBtn.classList.add('for-view');
  updateBtn.classList.add('btn');
  updateBtn.classList.add('btn-primary');
  updateBtn.addEventListener('click', () => {
    cardDiv.classList.add('is-editing');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.classList.add('for-view');
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-primary');
  deleteBtn.addEventListener('click', () => deleteMemo(id));

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '저장';
  saveBtn.classList.add('for-edit');
  saveBtn.classList.add('btn');
  saveBtn.classList.add('btn-primary');
  saveBtn.addEventListener('click', () => {
    updateMemo(id, titleInput.value, messageInput.value);
    cardDiv.classList.remove('is-editing');
  })

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '취소';
  cancelBtn.classList.add('for-edit');
  cancelBtn.classList.add('btn');
  cancelBtn.classList.add('btn-primary');
  cancelBtn.addEventListener('click', () => {
    cardDiv.classList.remove('is-editing');
  })

  cardDiv.appendChild(titleSpan);
  cardDiv.appendChild(titleInput);
  cardDiv.appendChild(messageSpan);
  cardDiv.appendChild(messageInput);
  cardDiv.appendChild(updateBtn);
  cardDiv.appendChild(deleteBtn);
  cardDiv.appendChild(saveBtn);
  cardDiv.appendChild(cancelBtn);
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

async function updateMemo(id, title, message) {
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
