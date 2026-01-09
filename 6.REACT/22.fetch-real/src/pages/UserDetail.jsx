import { useState, useEffect } from 'react';
import { fetchUserById } from '../api/usersApi';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { deleteUserById } from '../api/usersApi.js';

export default function UserDetail() {
  const navigate = useNavigate();

  const { userId } = useParams();
  const [user, setUser] = useState(null); // 단일 사용자이므로 초기값이 배열이 아니라 null이나 '' 등 사용
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUserById(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg(err.message)
        setLoading(false);
      })
  }, [userId]); // userId가 바뀔 때마다 새로 fetch
  // 그러나 지금은 이 페이지가 불릴 때마다 userId가 바껴서 올 것이므로 무방

  async function deleteMe(userId) {
    if (deleting) return; // 삭제 중이면 중복 삭제 작업을 하지 않는다.

    setDeleting(true);

    try {
      await deleteUserById(userId);
      navigate('/users'); // 삭제 후 목록 페이지로 이동
    } catch (err) {
      alert(err.message || '삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
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

      <div>
        <h1>User Detail</h1>
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, maxWidth: 400 }}>
          <div>
            <b>ID</b>: {user.id}
          </div>
          <div>
            <b>Name</b>: {user.name}
          </div>
          <div>
            <b>Email</b>: {user.email}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        {/* <div> */}
        <button onClick={() => navigate(-1)}>뒤로</button>
        <Link to="/users">Users 목록으로</Link>

        <button onClick={() => deleteMe(user.id)} disabled={deleting}>
          {deleting ? '삭제중...' : '삭제'}
        </button>
      </div>
    </div>
  )
}
