import { useState, useEffect, useMemo, useRef } from 'react';
import fetchLogin from '../api/auth';

const SAVED_ID_KEY = 'saved_login_id';
const REMEMBER_ID_KEY = 'if_remember';

function getInitionForm() {
  const savedId = localStorage.getItem(SAVED_ID_KEY) || '';

  return {
    id: savedId,
    pw: '',
    rememberId: Boolean(savedId)
  }
}

export function useLoginForm() {

  const [form, setForm] = useState(() => getInitionForm()); // lazy initialization. 이 페이지가 불릴 때 1회만 호출
  const [message, setMessage] = useState({ type: '', text: '' }); // 성공/실패 메시지를 담았다가 출력할곳

  const idRef = useRef(null);
  const pwRef = useRef(null);


  const updateField = (name, value) => {
    // setForm((prev) => ({ ...prev, [name]: value }));
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'rememberId') {
        if (!value) {
          localStorage.removeItem(SAVED_ID_KEY);
        } else if (prev.id.trim()) {
          localStorage.setItem(SAVED_ID_KEY, prev.id.trim());
        }
      }
      return next;
      // return { ...prev, [name]: value }
    });
  };

  // 이런 것을 useMemo()를 통해서 관리하면 더 좋다.
  const canSubmit = useMemo(() => {
    return form.id?.trim() !== '' && form.pw?.trim() !== '';
  }, [form.id, form.pw]);
  // form.id.trim() !== '' && form.pw.trim() !== '';
  // const canSubmit = form.id.trim() !== '' && form.pw.trim() !== '';

  // Mission. 이 페이지가 처음 렌더링될 때, local storage에 저장된 SAVED_ID_KEY가 있으면 불러온다.
  // useEffect(() => {
  //   const savedId = localStorage.getItem(SAVED_ID_KEY);

  //   if (localStorage.getItem(REMEMBER_ID_KEY) && savedId) {
  //     setForm(prev => ({ ...prev, id: savedId }));
  //   }
  // }, []);

  // 로그인 시 ID 또는 PW 입력 창에 자동 포커스
  useEffect(() => {
    idRef.current?.focus();
    if (form.id) pwRef.current?.focus();
  }, []);

  // 로그인 성공 후 2초 후에 성공 메시지 지우기
  useEffect(() => {
    if (message.type !== 'success') return;

    const timer = setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 2000); // 2초 후에 메시지 상태 초기화

    return () => clearTimeout(timer);
  }, [message]);

  const submit = async () => {
    const id = form.id.trim();
    const pw = form.pw.trim();

    // 버튼 비활성화 때문에 이 조건이 성립될 수가 없으므로 아래 조건문은 지워도 무관
    if (!id || !pw) { // 둘중에 하나라도 빈 값이면? 오류...
      setMessage({ type: 'error', text: '아이디와 비밀번호를 모두 입력해 주세요.' });
      return;
    }

    // 가상의 id/pw 체크 로직
    try {
      const { ok, user } = await fetchLogin({ id, pwd });
      if (!ok) throw new Error('로그인에 실패했습니다.');

      setMessage({ type: 'success', text: '로그인 성공' });
      setForm((prev) => ({ ...prev, pw: '' }));

      // 로그인 성공 후 사용자 정보 반환
      return user;
      // navigate('/profile');
    } catch (err) {
      setMessage({ type: 'error', text: `로그인 실패: ${err.message}` || '오류가 발생했습니다.' });
      setForm((prev) => ({ ...prev, pw: '' }));
      throw err;
    }
    // const ok = id === 'admin' && pw === '1234';
  }

  return {
    form, message, canSubmit, updateField, submit, idRef, pwRef,
  }
}
