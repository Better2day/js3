document.addEventListener('DOMContentLoaded', () => {
  // 현재 이 사용자의 로그인 상태 확인
  checkLoginStatus(); // 나의 상태를 '제대로' 알고 있는 것은 서버의 세션 (클라이언트 X)

  document.getElementById('loginButton').addEventListener('click', login);
  document.getElementById('logoutButton').addEventListener('click', logout);
});

function checkLoginStatus() {
  fetch('/check-login')
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if (data.username) {
        showProfile(data.username);
      } else {
        showLoginForm();
      }
    })
}

function login(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log(username);
  console.log(password);

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json()) // 서버에서 JSON으로 보냈을 때만 이렇게 처리 가능
    .then(data => {
      // 텍스트로 결과를 주고 받고 비교하는 안 좋은 방식. 수업이라 빠르게 진행하기 위해서 이렇게 하심
      if (data.message == '로그인 성공') {
        // alert('로그인 성공'); // 처리 방법 1
        // window.location.href = '/profile'; // 방법 2
        showProfile(username);
      } else {
        alert('로그인 실패');
      }
    })
}

function logout() {
  fetch('/logout') // GET method. 보내는 정보 아무 것도 없고, 요청하는 순간 끝
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message == '로그아웃 성공') {
        // alert(data.message);
        showLoginForm();
      }
    })
}

function showProfile(username) {
  document.getElementById('loginFormContainer').style.display = 'none'; // 로그인 폼 숨기기
  document.getElementById('profile').style.display = 'block'; // 사용자 프로파일 창 보이기
  document.getElementById('usernameSpan').innerText = username;
}

function showLoginForm() {
  document.getElementById('profile').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';
}