import { useState, useEffect } from 'react';
import { fetchUserById } from '../api/dummyUsersApi';
import { useParams, navigate, Link } from 'react-router-dom';

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null); // 단일 사용자이므로 초기값이 배열이 아니라 null이나 '' 등 사용
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserById(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
  }, [userId]); // userId가 바뀔 때마다 새로 fetch
  // 그러나 지금은 이 페이지가 불릴 때마다 userId가 바껴서 올 것이므로 무방


  /*****************************************
   * 아래에는 DOM Rendering Code만 추가할 것
  *****************************************/
  if (loading) return <p>로딩중...</p>

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
      </div>
    </div>
  )
}
