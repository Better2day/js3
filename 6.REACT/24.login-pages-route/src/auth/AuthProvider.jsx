import { useState, useEffect, useMemo, createContext, useContext } from 'react';

const STORAGE_KEY = 'auth_user';
const storage = sessionStorage; // 임시 로그인 정보를 브라우저의 세션 스토리지에 저장

// 원하는 것을 담기 위한 빈 공간 생성
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setUser(parsed);
    } catch {
      // 저장된 값이 내 생각과 일치하지 않으면
      storage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = (nextUser) => {
    setUser(nextUser);
    storage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  }

  const logout = () => {
    setUser(null);
    storage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(() => {
    return {
      user,
      isAuthed: !!user, // 로그인 여부
      login,
      logout
    }
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('접근 불가 (<AuthContext>를 감싸지 않은 컴포넌트에서 나를 호출했음.');
  }
  return ctx;
}
