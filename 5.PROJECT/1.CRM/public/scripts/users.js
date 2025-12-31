document.addEventListener('DOMContentLoaded', getUsers);

function getUsers() {
  // BE에 users page 요청
  const users = fetch('/users');
  if (users) {
    addUsers();
  }
};

function addUsers() {
  // table → tbody 안에 사용자 추가

};
