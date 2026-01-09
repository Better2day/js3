import { Routes, Route } from 'react-router-dom'

import RootLayout from './layouts/RootLayout.jsx';

// 확장자가 jsx인 파일은 JSX 문법으로 return을 해주는 파일
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      {/* 상단 Nav Bar (Navigation Bar) */}
      <Route path="/" element={<RootLayout />}>

        {/* 물리적 페이지 */}
        <Route index element={<Home />} />

        {/* 추상적 페이지 */}
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />

        {/* 404 Not Found Page (가려고 하는데 없는 페이지. 안 만들면 기본 404 오류가 나올텐데, 따로 Design page를 만드는 셈) */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
