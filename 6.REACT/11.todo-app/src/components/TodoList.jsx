import { useState } from 'react';

export default function TodoList({ todos, onToggle, onDelete }) {
  const [hide, setHide] = useState(false);
  return (
    <>
      {/* <h3>할 일 목록</h3> */}
      <div style={{ marginTop: 10 }}>
        <input
          type="checkbox"
          // '완료 항목 숨기기' 기능은 화면에서만 일어나는 일이라서, To-do 데이터 속성에 hide 속성을 넣을 필요가 없어서 리팩토링
          onChange={e => setHide(!hide)}
        />
        완료 항목 숨기기
      </div>
      <ul style={{ marginTop: 12, paddingLeft: 16 }}>
        {todos.map(t => (
          <li key={t.id} style={{ paddingBottom: 8, display: (t.done && hide ? 'none' : 'block') }}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => { onToggle(t.id) }}
            />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
              {t.text}
            </span>
            <button onClick={() => { onDelete(t.id) }} style={{ marginLeft: 'auto' }}>삭제</button>
          </li>
        ))}
      </ul >
    </>
  )
}
