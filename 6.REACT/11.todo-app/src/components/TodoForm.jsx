export default function TodoForm({ text, setText, onAdd }) {
  return (
    <form onSubmit={onAdd} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)} />
      <button>추가</button>
    </form>
  )
}
