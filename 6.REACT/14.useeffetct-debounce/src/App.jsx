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

    // 이전에 timeout 설정한 것. 그 다음 useEffect 실행시 그 전의 useEffect를 cleanup 하는 함수
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
