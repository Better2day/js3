document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM loading completed!');
  fetchTodoList();
});

const todoList = document.getElementById('todo-list'); // ul
const todoInput = document.getElementById('todo');

document.getElementById('add-todo').addEventListener('click', addTodo);
// 엔터키를 눌러도 To do 추가 가능
todoInput.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    addTodo();
  }
});

function addTodo() {
  fetch('/api/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      'todo': todoInput.value
    })
  })
    .then(response => response.json())
    .then(data => {
      renderTodo(data); // { id: 1, todo: '첫 번째 할 일' } 식
      console.log(data);
    })
    .catch(error => console.log(error))

  // fetchTodoList(); // To do를 추가한 다음에는 전체 목록 다시 로드
  // 서버에 부하를 줄 수 있는데 굳이 이렇게 할 필요 없어서, 새로 추가한 To do만 li 노드로 추가
}

function fetchTodoList() {
  fetch('/api/todo')
    .then(response => response.json())
    .then(data => renderTodoList(data))
    .catch(error => console.log(error));
}

// 요소를 만들고 추가하는 작업이 주기능이므로 함수명에 render가 적합한지 생각해볼 것! 약간 헷갈린다.
function renderTodoList(todoArr) {
  todoList.innerHTML = '';
  todoArr.forEach(el => {
    // const li = document.createElement('li');
    // li.textContent += el.todo;
    // todoList.appendChild(li);
    renderTodo(el);
  });
}

// 요소를 만들고 추가하는 작업이 주기능이므로 함수명에 render가 적합한지 생각해볼 것! 약간 헷갈린다.
function renderTodo(el) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerText = '삭제';
  li.innerHTML += el.todo + ' ';
  li.appendChild(delBtn);
  todoList.appendChild(li);

  delBtn.addEventListener('click', () => {
    if (deleteTodo(el.id)) {
      li.remove();
    }
  });

  // To do 클릭했을 때 li → input 으로 바꿔서 업데이트할 수 있도록 수정중
  li.addEventListener('click', () => {
    const updateInput = document.createElement('input');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('value', el.todo);
    updateInput.addEventListener('focusout', () => {
      updateTodo(el);
      updateInput.remove();
    });
    li.insertAdjacentElement('afterend', updateInput);
    li.remove();
  });

  li.addEventListener('dblclick', () => {
    li.classList.toggle('completed');
  });
}

function deleteTodo(todoId) {
  fetch(`/api/todo/${todoId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  return true;
}

function updateTodo(el) {
  console.log('수정이염');
  // renderTodo(el); // li
  // To do를 입력했을 때 li 요소를 만들고 추가하는 작업이 위 함수 내부 로직에 있어서 넣었는데,
  // To do update 기능의 경우 li → input 으로 바꿔서 수정 후
  // 수정 작업이 완료되었을 때 input → li로 바꿔야 해서 (input 바로 다음에 li를 추가 후 input 삭제)
  // 약간 로직이 다르다.
  // 함수를 따로 만들어야 할지, renderTodo에 위치 인자(기본값은 없는 것)를 줘서 처리할지 고민 필요!
}
