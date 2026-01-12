import { NavLink, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// 인증 정보 기반에 내 자식 컴포넌트 보호하기
import ProtectedRoute from './auth/ProtectedRoute.jsx';

// 인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from './auth/AuthProvider.jsx';


const linkStyle = ({ isActive }) => ({
  padding: '8px 10px',
  borderRadius: 10,
  textDecoration: 'none',
  color: 'inherit',
  background: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
});

function App() {
  const { isAuthed, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 이후 / (또는 /login)으로 보내기 
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h2>로그인 앱</h2>

        <nav>
          <NavLink to='/' style={linkStyle}>
            Home
          </NavLink>

          {/* 조건에 따라서 내브바 링크 변경 */}
          {!isAuthed ? (
            <NavLink to='/login' style={linkStyle}>
              Login
            </NavLink>
          ) : (
            <>
              <span style={{ opacity: 0.7, fontSize: 14 }}>
                {user?.id ? `안녕하세요, ${user.id}` : `로그인 됨`}
              </span>

              <button
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          <NavLink to='/profile' style={linkStyle}>
            Profile
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />

          {/* profile 페이지는 인증된 사용자만 접근할 수 있도록 제한 */}
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div >
  )
}

export default App
