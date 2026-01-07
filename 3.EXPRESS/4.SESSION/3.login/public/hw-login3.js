document.addEventListener('DOMContentLoaded', () => {
  checkLogin();
});

function checkLogin() {
  fetch('/check-login')
    .then(res => res.json())
    .then(data => {
      console.log('checkLogin 함수 안');
      setDiv(data);
    });
}

function setDiv(data) {
  const loginDiv = document.getElementById('login-div');
  const profileDiv = document.getElementById('profile-div');

  if (data && data.isLoggedIn) {
    loginDiv.style = 'display:none';
    profileDiv.style = 'display:block';
    document.getElementById('user-info').innerHTML = `${data.username}님이 로그인 중`;
  } else {
    loginDiv.style = 'display:block';
    profileDiv.style = 'display:none';
  }
};

// button type='submit' 이 아니라 type='button'을 사용하면 클릭했을 때 자동으로 form이 제출되지 않는다.
// 그러므로 버튼을 클릭했을 때 preventDefault()를 할 필요도 없다. (발생 이벤트도 'submit' 대신에 'click')
// 폼 기본 제출 기능이 아니라 fetch로 데이터를 전송할 것이면 type='button'을 사용하는 게 나을 것 같다.
// document.getElementById('login-form').addEventListener('submit', e => {
// e.preventDefault();

document.getElementById('login-form').querySelector('button').addEventListener('click', e => {
  // console.log('여기');

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      setDiv(data)
    });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  fetch('/logout')
    .then(res => res.json())
    .then(data => {
      setDiv(data)
    });
})
