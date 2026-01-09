import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchUsers, deleteUserById } from '../api/usersApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    // AbortController는 브라우저 기본 함수 (Web API)
    // 비슷한 것: fetch, localStorage, URL, AbortController 등
    // const controller = new AbortController();
    // fetchUsers({ signal: controller.signal }) // ※ 무조건 오류 발생. 오타?
    fetchUsers()
      // 실제로 HTTP 요청을 한 것이 아니므로 res => res.json() 할 필요 없음
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg(err.message)
        setLoading(false);
      })

    // clearnup 함수
    // return () => controller.abort();
  }, []); // 최초 한 번만 실행

  async function deleteUser(id) {
    // 이미 삭제 중이면 재진입 불가
    if (deletingId !== null) return;

    setDeletingId(id);

    try {
      await deleteUserById(id);

      // 성공 메시지가 오면?
      setUsers((prev) => prev.filter(u => u.id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }


  /*****************************************
   * 아래에는 DOM Rendering Code만 추가할 것
  *****************************************/
  if (loading) return <p>로딩중...</p>
  if (errorMsg) {
    return (
      <div>
        <h1>Users</h1>
        <p style={{ color: 'crimson' }}>Error: {errorMsg}</p>
        <button onClick={() => window.location.reload()}>새로 고침</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u => {
          const isDeleting = deletingId === u.id;

          return (
            <li key={u.id}>
              <Link to={`/users/${u.id}`}>{u.name}</Link>

              <button
                style={{ marginLeft: 8 }}
                disabled={deletingId != null}
                onClick={() => deleteUser(u.id)}
              >
                {isDeleting ? '삭제중...' : '삭제'}
              </button>
            </li>
          )
        })}
      </ul>

      {users.length === 0 && <p>표시할 사용자가 없습니다.</p>}
    </div>
  )
}
