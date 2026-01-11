import { useState, useEffect } from 'react'

function App() {
  const [keyword, setKeyword] = useState('');
  // const [result, setResult] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!keyword) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      // setResult([`"${keyword}" 검색 결과`]);

      // API 호출
      console.log('검색 실행: ', keyword);

      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(u => u.name.toLowerCase().includes(keyword.toLowerCase()));
          setUsers(filtered);
        })
    }, 1000); // 1.0초 뒤에 실행

    // 이전에 timeout을 설정한 것. 그 다음 useEffect 실행시 그 전의 useEffect를 cleanup 하는 함수
    // (1초가 지나지 않아서 아직 실행되지 않은 기존 setTimeout을 취소시키고, 새 setTimeout을 실행 →
    // 즉, 입력 후 1초가 지나야 실행되는 debouncing 효과)
    // react useEffect 규칙: useEffect의 콜백 함수는 cleanup 함수를 반환하거나 아무것도 반환하지 않아야 한다.
    // cleanup 함수를 반환하면, 다음 effect 실행 전에 react가 cleanup 함수를 호출한다.
    return () => clearTimeout(timer);

  }, [keyword]);

  return (
    <div>
      <h2>사용자 검색</h2>
      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="검색어 입력"
      />
      <button>검색</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

    </div>
  )
}

export default App
