const BASE_URL = 'https://jsonplaceholder.typicode.com';

// signal은 비동기 작업을 중간에 중단할 수 있는 조건 변수
// async function requestJson(url, { signal } = {}) {
// const res = await fetch(url, { signal });
async function requestJson(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${req.status}`);
  }
  return res.json();
}

// export async function fetchUsers({ signal } = {}) {
// return requestJson(`${BASE_URL}/users`, { signal });
export async function fetchUsers() {
  return requestJson(`${BASE_URL}/users`);
}

// export async function fetchUserById(userId, { signal } = {}) {
// return requestJson(`${BASE_URL}/users/${userId}`, { signal });
export async function fetchUserById(userId) {
  return requestJson(`${BASE_URL}/users/${userId}`);
}

export async function deleteUserById(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}

export async function getPosts() {
  return await requestJson(`${BASE_URL}/posts`);
}

export async function getPostById(postId) {
  return requestJson(`${BASE_URL}/posts/${postId}`);
}

export async function deletePostById(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}
