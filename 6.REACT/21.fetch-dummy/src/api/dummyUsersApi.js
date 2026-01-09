const USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// 실제로 네트워크를 통해서 가져오는 것처럼 보려주려고 일부러 딜레이 추가
const API_DELAY_MS = 150;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchUsers() {
  await sleep(API_DELAY_MS);
  return USERS;
}

export async function fetchUserById(userId) {
  await sleep(API_DELAY_MS);
  const user = USERS.find(u => u.id == userId) || null;
  // const user = USERS.find(u => String(u.id) === String(userId));
  return user;
}
