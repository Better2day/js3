export default function fetchLogin({ id, pw }) {
  // 지금은 가짜로 요청하는 척 하는 것이지만, 나중에 실제로 fetch 작업을 하면 된다.

  // 가상 로그인 시도
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 'admin' && pw === '1234') {
        resolve({ ok: true, user: { id } });
      } else {
        reject(new Error('아이디 또는 비밀번호가 올바르지 않습니다.'));
      }
    }, 1000); // 적절하게 조절
  });
}
