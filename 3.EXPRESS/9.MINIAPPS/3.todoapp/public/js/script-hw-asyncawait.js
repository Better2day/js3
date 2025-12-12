document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM loading completed!');
  fetchTodoList();
});

const todoList = document.getElementById('todo-list'); // ul
const todoInput = document.getElementById('todo');

document.getElementById('add-todo').addEventListener('click', addTodo);
// 엔터키를 눌러도 To do 추가 가능
// todoInput.addEventListener('keyup', e => {
document.addEventListener('keyup', e => {
  const updateInput = document.querySelector('ul > input');
  console.log(updateInput);

  if (e.key == 'Enter') {
    if (e.target == todoInput) {
      addTodo();
    } else if (e.target == updateInput) {
      // To do를 업데이트할 때도 엔터키 입력을 지원하기 위한 로직
      // 현재 To do 업데이트 창(updateInput)은 focusout 이벤트 발생시 updateTodo() 함수를 호출
      // 그런데, updateTodo() 함수는 이 리스너에 없는 인자가 필요하므로, 아래와 같이 다른 요소에 focus를 줘서 우회
      // (아래처럼 하면 updateInput 요소에 달려있는 focusout 리스너가 실행 → updateTodo() 함수 호출)
      todoInput.focus();
    }
  }
});

async function addTodo() {
  const response = await fetch('/api/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ 'todo': todoInput.value })
  });
  const data = await response.json();
  if (data) {
    console.log(data);
    renderTodo(data); // { id: 1, todo: '첫 번째 할 일' } 식
  };

  // .catch(error => console.log(error));
  // 일단 과제 다 한 다음에 try { } catch { } 처리해야 함

  // fetchTodoList(); // To do를 추가한 다음에는 전체 목록 다시 로드
  // 서버에 부하를 줄 수 있는데 굳이 이렇게 할 필요 없어서, renderTodo(data)로 새로 추가한 To do만 li 노드로 추가
  todoInput.value = '';
}

async function fetchTodoList() {
  const response = await fetch('/api/todo');
  const data = await response.json();
  if (data) {
    renderTodoList(data);
  }
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
  li.addEventListener('dblclick', () => {
    const updateInput = document.createElement('input');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('value', el.todo);
    updateInput.addEventListener('focusout', () => {
      updateTodo(el, updateInput, li);
      updateInput.remove();
    });
    li.insertAdjacentElement('afterend', updateInput);
    updateInput.focus();
    // li.remove();
    li.hidden = true;
  });

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });
}

async function deleteTodo(todoId) {
  const response = await fetch(`/api/todo/${todoId}`, { method: 'DELETE' });
  const data = await response.json();
  if (data) {
    console.log(data);
  }
  return true;
}

async function updateTodo(el, updateInput, li) {
  // renderTodo(el); // li
  // To do를 입력했을 때 li 요소를 만들고 추가하는 작업이 위 함수 내부 로직에 있어서 넣었는데,
  // To do update 기능의 경우 li → input 으로 바꿔서 수정 후
  // 수정 작업이 완료되었을 때 input → li로 바꿔야 해서 (input 바로 다음에 li를 추가 후 input 삭제)
  // 약간 로직이 다르다.
  // 함수를 따로 만들어야 할지, renderTodo에 위치 인자(기본값은 없는 것)를 줘서 처리할지 고민 필요!

  // renderTodo 앞 로직 상당 부분과 중복. 함수로 모듈화해야 할 듯
  const delBtn = document.createElement('button');
  delBtn.innerText = '삭제';
  li.innerHTML = updateInput.value + ' ';
  li.appendChild(delBtn);

  // li.insertAdjacentElement('afterend', updateInput);
  delBtn.addEventListener('click', () => {
    if (deleteTodo(el.id)) {
      li.remove();
    }
  });

  const response = await fetch(`/api/todo/${el.id}/todo`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ 'todo': updateInput.value })
  });
  const data = await response.json();

  if (data) {
    console.log(data);
  }

  li.hidden = false;
  todoInput.value = '';
}
