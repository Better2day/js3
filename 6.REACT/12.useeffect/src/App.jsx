import { useState, useEffect } from 'react' // useEffect는 side-effect에서 나온 말
import UserCard from './components/UserCard';

function App() {
  // const [count, setCount] = useState(0)

  // const countIncrement = (count) => {
  //   console.log('count: ', count);
  //   setCount(count + 1);
  //   console.log('count: ', count);
  // };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 변경이 감지되었을 때 할 일을 정의
    // console.log('진짜 변경이 이루어지는 시점의 count: ', count);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
  }, []);
  // .then(data => console.log(data))
  // }, [count]);

  if (loading) return <p>로딩중...</p>;
  // setTimeout(() => {
  //  if (loading) return <p>로딩중...</p>; }, 2000); // 내 맘대로 해본 것이고 작동하지 않는 듯 한데, 수업중이라서 보류

  function removeUser(id) {
    setUsers(users.filter(u => u.id !== id));

  }

  return (
    <>
      <h1>useEffect를 통한 외부 API 요청</h1>
      <h2>사용자 목록</h2>
      <div style={{ padding: 16, maxWidth: 500 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(u => (
            // <UserCard key={u.id} user={u} />
            <UserCard key={u.id} user={u} onRemove={removeUser} />
            // <UserCard user={u}  />
          ))}
        </ul>
      </div>

      {/* <div>
        <button onClick={countIncrement}>
          count is {count}
        </button>
      </div> */}
    </>
  )
}

export default App
