document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loading completed.');

  async function getTodo() {
    const res = await fetch('/api/todos');
    const data = await res.json();

    console.log(data);
    renderTodos(data);
  }

  getTodo();

  function renderTodos(data) {
    const result = document.getElementById('todo-list');
    result.innerHTML = '';
    data.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.todo;
      li.classList.toggle('completed', todo.completed);
      result.appendChild(li);

      li.addEventListener('click', async () => {
        const res = await fetch(`/api/todos/${todo.id}/completed`, { method: 'PUT' });
        const data = await res.json();
        if (data.success == true) {
          getTodo();
        } else {
          alert('해당 항목은 찾을 수 없습니다.');
        }

      })

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '삭제';
      deleteBtn.addEventListener('click', async e => {
        e.stopPropagation();
        const res = await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
        const data = res.json();
        getTodo();
      })
      li.appendChild(deleteBtn);
    });
  }

  // To do 추가
  const addBtn = document.getElementById('add-todo');
  addBtn.addEventListener('click', async () => {
    const inputText = document.getElementById('new-todo').value;
    const text = inputText.trim();
    console.log(text);
    if (!text) return; // 빈 칸이면 끝

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: text })
    });
    const data = await res.json();
    getTodo();
  });
});
