import { useState } from 'react';

function Child({ sendMessageToParent }) {
  // const [message, setMessage] = useState('');
  const [text, setText] = useState('');

  return (
    <div>
      <h3>자식</h3>
      {/* 사용자가 입력중이라 실시간으로 변하는 값을 부모가 관리할 필요는 없어서 자식이 관리 */}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => sendMessageToParent(text)}>입력값 전달</button>
    </div>
  )
}

export default Child;
