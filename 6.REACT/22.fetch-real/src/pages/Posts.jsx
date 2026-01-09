import { useState, useEffect, useMemo } from 'react';
import { getPosts } from '../api/usersApi';

const PAGE_SIZE = 20;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1); // 1~5


  useEffect(() => {
    setLoading(true);
    setErrorMsg('');

    getPosts()
      .then(data => setPosts(data))
      .catch(err => setErrorMsg(err.message))
      .finally(setLoading(false))
  }, []);


  /*****************************************
  * 아래에는 DOM Rendering Code만 추가할 것
  *****************************************/

  // 페이지 처리를 위해 필요한 변수와 연산을 useMemo()라는 hooks를 통해서 관리 (이따가 배울 예정)
  // const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  // posts.length가 최솟값이 0이고 음수가 나올 일은 없을테니,
  // 굳이 함수를 호출하는 대신에 간단히 Math.ceil(posts.length / PAGE_SIZE) || 1 식으로 연산자를 이용하는 게 낫지 않을까?
  // const start = (page - 1) * PAGE_SIZE;
  // const visible = posts.slice(start, start + PAGE_SIZE);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  }, [posts.length]); // 이 의존성(dependency)를 지켜보다가 '달라질 때만' 계산해서 갱신해라

  const visible = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, page]); // 여기는 두 개에 의존

  if (loading) return <p>로딩중...</p>

  if (errorMsg) {
    return (
      <div>
        <h1>Posts</h1>
        <p style={{ color: 'crimson' }}>Error: {errorMsg}</p>
        <button onClick={() => window.location.reload()}>새로 고침</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Posts</h1>
      <p style={{ color: '#555' }}>
        전체 {posts.length}개 - 페이지 {page} / {totalPages}
      </p>

      <ul>
        {visible.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          const n = i + 1;
          const isActive = n === page;

          return (
            <button
              key={n}
              style={{ fontWeight: isActive ? '700' : '400' }}
              onClick={() => setPage(n)}
            >
              {n}
            </button>

          )
        })}
        <button
          disable={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* style={{
                fontWeight: isActive ? '700 : '400' }} */}

      {/* {posts.length === 0 && <p>Posts가 없습니다.</p>} */}
    </div >
  )
}
