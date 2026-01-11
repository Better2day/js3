import { useState, useEffect } from 'react' // useEffect는 side-effect에서 나온 말
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // console.log('진짜 변경이 이루어지는 시점의 count: ', count);
    // side-effect 작업을 하고 싶으면 useEffect 안에서 해야 함
    // setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
    // }, 500);
  }, []);
  // .then(data => console.log(data))
  // }, [count]);

  if (loading) return <p>로딩중...</p>;

  // 여기서 setTimeout을 하면 안 됨
  // setTimeout(() => {
  //   if (loading) return <p>로딩중...</p>;
  // }, 2000); // 내 맘대로 해본 것이고 작동하지 않는 듯 한데, 수업중이라서 보류

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
            <UserCard key={u.id} user={u} onRemove={removeUser} />
            // <UserCard key={u.id} user={u} />
            // <UserCard user={u}  />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
