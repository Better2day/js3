import { useState, useEffect } from 'react' // useEffect는 side-effect에서 나온 말
import UserCard from './components/UserCard';
import SearchInput from './components/SearchInput';

function App() {
  // const [count, setCount] = useState(0)

  // const countIncrement = (count) => {
  //   console.log('count: ', count);
  //   setCount(count + 1);
  //   console.log('count: ', count);
  // };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

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

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(keyword.toLowerCase()));

  // const getUserInput = (e) => {
  //   setKeyword(e.target.value);
  // };

  return (
    <>
      {/* <h1>useEffect를 통한 외부 API 요청</h1> */}
      <h2 className="m-4">사용자 목록</h2>
      <div className="container pb-4">
        <SearchInput value={keyword} onChange={setKeyword} />
        <div class="row">
          {/* <ul style={{ listStyle: 'none', padding: 0 }}> */}
          {filteredUsers.map(u => (
            // if (u.name.includes(filter)) {
            <div className="col-md-6 col-lg-4" key={u.id}>
              <UserCard user={u} onRemove={removeUser} />
            </div>
            // <UserCard key={u.id} user={u} />
            // <UserCard user={u}  />
          )
            // }
          )}
          {/* </ul> */}
        </div>
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
