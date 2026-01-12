// useRef는 DOM 및 rendering과 무관한 DOM 요소를 제어하기 위해서 사용한다.
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import { useAuth } from '../auth/AuthProvider';

// import LoginForm from '../components/LoginForm';
// import fetchLogin from '../api/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { form, message, canSubmit, updateField, submit, idRef, pwRef } = useLoginForm();
}

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = await submit();

    // 로그인 성공 후 이동...
    navigate('/profile');
  } catch (err) {
    // 일단 skip
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>로그인</h2>

      <LoginForm
        form={form}
        message={message}
        canSubmit={canSubmit}
        onChange={updateField}
        onSubmit={handleSubmit}
        idRef={idRef}
        pwRef={pwRef}
      />
    </div>
  );
};

