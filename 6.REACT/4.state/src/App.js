import { useState } from 'react';
import Message from './Message';

function App() {
  const [count, setCount] = useState(0);

  // 자주 호출된다든지 다른데서 호출할 함수가 아니라서 화살표 함수로 만들어도 괜찮음
  const countInc = () => {
    setCount(count + 1);
  }

  const countDec = () => {
    setCount(count - 1);
  }

  // function으로 해도 되고, 변수에 함수를 할당해도 된다.
  function countReset() {
    setCount(0)
  }

  return ( // 무조건 하나의 태그만 반납해야 해서, div로 묶거나 <>로 묶어야 한다.
    <>
      <h1>Counter</h1>
      <p className="message">{count}</p>
      <button onClick={countInc}>+1 증가</button>
      <button onClick={countDec}>-1 감소</button>
      <button onClick={countReset}>초기화</button>

      {/* 컴포넌트에 props로 나의 상태를 전달 */}
      <Message count={count} />
    </>
  );
}

export default App;
