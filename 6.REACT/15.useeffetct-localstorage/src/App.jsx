import { useState, useEffect } from 'react'
import './App.css';

const KEY = 'theme_dark'; // 로컬 스토리지에 저장할 변수

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(KEY);
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem(KEY, String(darkMode));
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="page">
      <div className="card">

        <h2>Theme setting</h2>

        <label className="row">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={e => setDarkMode(e.target.checked)}
          />다크 모드
        </label>

        <p className="muted">현재 상태: {darkMode ? 'On' : 'Off'}</p>

        <button className="btn" onClick={() => alert('동작 확인')}>버튼 예시</button>
      </div>
    </div>
  )
}

export default App
