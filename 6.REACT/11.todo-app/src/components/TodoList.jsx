export default function TodoList({ todos, onToggle, onHide, onDelete }) {
  return (
    <>
      {/* <h3>할 일 목록</h3> */}
      <div style={{ marginTop: 10 }}>
        <input type="checkbox" onChange={onHide} />
        완료 항목 숨기기
      </div>
      <ul style={{ marginTop: 12, paddingLeft: 16 }}>
        {todos.map(t => (
          <li key={t.id} style={{ paddingBottom: 8, display: t.hide ? 'none' : 'block' }}>
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
