import { useState } from 'react';

import Counter from './components/Counter.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 공부하기', done: false, hide: false },
    { id: 2, text: 'Vite 공부하기', done: false, hide: false },
  ]);

  // 아래는 Controlled 상태 (↔ 자식이 데이터를 전달해주고 내가 관리하지 않는 것 Uncontrolled 상태)
  const [text, setText] = useState('');

  function addTodo(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(), // 가장 간단하게 id를 만드는 방법
      text: trimmed,
      done: false,
      hide: false
    }

    setTodos((prev) => [newTodo, ...prev]); // 새 To-do를 기존 할 일 목록 '앞'에 추가
    setText('');
  }

  function toggleTodo(id) {
    // ※ 아래처럼 직접 변경하면 안 됨. 이렇게 하면 상태 관리가 안 된다.
    // const todo = todos.find(t => t.id === id);
    // todo.done = !todo.done;

    setTodos((prev) =>
      // prev.map(t => (t.id === id ? { ...t, done: !t.done } : t));

      prev.map(t => {
        if (t.id !== id) return t; // 클릭된 항목이 아니면 그대로 둔다.
        return { ...t, done: !t.done } // 클릭된 항목만 다른 컬럼은 두고, done만 토글
      })
    )
  }

  function hideTodo() {
    console.log('hideTodo 실행 전: ', todos);
    setTodos(() => {

      const newTodo = todos.map(t => {
        console.log('hideTodo 내부 setTodos에 넘겨준 콜백 함수 안');
        if (t.done) {
          t.hide = !t.hide;
        }
        return t;
      })
      console.log('hideTodo 실행 후: ', newTodo);
      return newTodo;
    })
  }

  function deleteTodo(id) {
    // ※ 아래처럼 직접 변경하면 안 됨. 이렇게 하면 상태 관리가 안 된다.
    // const index = todos.findIndex(t => t.id === id);
    // todos.splice(index, 1); // 원본 데이터 일부를 삭제
    // setTodos(todos);
    // 이미 원본 데이터 일부를 삭제한 뒤에(상태를 변경한 뒤에) 상태를 그 데이터로 설정하면, React가 보기에는 변경된 것이 없는 상태

    setTodos((prev) =>
      prev.filter(t => t.id !== id)
    )
  }

  return (
    <>
      <div style={{ padding: 16, maxWidth: 500 }}>
        <h1>Mini To-do</h1>
        <Counter todos={todos} />
        <TodoForm text={text} setText={setText} onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onHide={hideTodo} onDelete={deleteTodo} />
      </div>

      {/*
      <div>
         <form>
          <input type="text" placeholder="할 일을 입력하세요" />
          <button>추가</button>
        </form>
        <h2>할 일 목록</h2>
        <ul>
          {todos.map(t => (
            <li>
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </div>
      */}
    </>
  )
}
