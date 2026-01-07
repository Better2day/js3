function Child({ sendMessageToParent }) {
  return (
    <div>
      <h3>자식</h3>
      <button onClick={() => sendMessageToParent('안녕하세요 부모님')}>부모에게 메시지</button>
    </div>
  )
}

export default Child;
