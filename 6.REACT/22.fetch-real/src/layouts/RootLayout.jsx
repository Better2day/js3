import { NavLink, Outlet } from 'react-router-dom';

// 상단 메뉴 (Navbar를 클릭해서 이동하는 링크 정의인 NavLink)
// 메뉴 아래 나오는 실제 페이지가 표시될 곳 Outlet

const linkStyle = ({ isActive }) => ({
  textDecoration: 'none',
  fontWeight: isActive ? 700 : 400,
});

export default function RootLayout() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {/* 가상 주소, 가상 링크 */}
        {/* end 속성을 붙이면 exact match. /의 경우 안 하면 밑에 다른  */}
        <NavLink to="/" end style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/users" style={linkStyle}>
          Users
        </NavLink>
        <NavLink to="/posts" style={linkStyle}>
          Posts
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>
      </nav>

      <hr />

      {/* 내브 링크로 이동했을 때, 아래 자식 컴포넌트만 다시 렌더링 (위 내브 링크는 업데이트할 필요 없으므로) */}
      <Outlet />
    </div >
  )
}
