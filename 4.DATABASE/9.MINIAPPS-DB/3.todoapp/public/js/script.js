document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loading completed.');

  function getTodo() {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        renderTodos(data);

      });
  }

  getTodo();

  function renderTodos(todos) {
    const result = document.getElementById('todo-list');
    result.innerHTML = '';

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.todo;
      // if (todo.completed) {
      //   li.classList.add('completed');
      // } else {
      //   li.classList.remove('completed');
      // }
      li.classList.toggle('completed', todo.completed);
      result.appendChild(li);

      li.addEventListener('click', () => {
        fetch(`/api/todos/${todo.id}/completed`, { method: 'PUT' })
          .then(() => getTodo());

      })

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '삭제';
      deleteBtn.addEventListener('click', e => {
        e.stopPropagation();
        fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
          .then(() => getTodo());
      })
      li.appendChild(deleteBtn);
    });
  }

  // To do 추가
  const addBtn = document.getElementById('add-todo');
  addBtn.addEventListener('click', () => {
    const inputText = document.getElementById('new-todo').value;
    const text = inputText.trim();
    console.log(text);
    if (!text) return; // 빈 칸이면 끝

    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: text })
    })
      .then(data => getTodo());
  });
});
