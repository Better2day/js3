export default function Counter({ todos }) {
  return (
    <span>전체: {todos.length} / 완료: {todos.filter(t => t.done).length}
    </span>
  )
}
