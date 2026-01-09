import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchUsers } from '../api/dummyUsersApi.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      // 실제로 HTTP 요청을 한 것이 아니므로 res => res.json() 할 필요 없음
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
  }, []); // 최초 한 번만 실행


  /*****************************************
   * 아래에는 DOM Rendering Code만 추가할 것
  *****************************************/
  if (loading) return <p>로딩중...</p>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
