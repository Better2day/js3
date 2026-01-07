// 부모 - 자식 간에 데이터를 주고받는 가장 기본이 되는 패턴
// 상태 관리를 자식이 하는 경우

// import { useState } from 'react';
import Child from './Child';

function Parent() {
  // const [message, setMessage] = useState(''); // 부모가 상태 관리를 안 할 거라서 삭제

  const handleMessage = (data) => {
    console.log('자식에게 받은 값: ', data);
  }

  return (
    < div >
      <h2>부모</h2>
      <Child sendMessageToParent={handleMessage} />
    </div >
  )
}

export default Parent;
