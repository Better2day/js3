const BASE_URL = 'http://127.0.0.1:3000';

export default async function searchNaverBlog({
  query,
  page = 1,
  display = 10
}) {
  try {
    const url =
      // `${BASE_URL}/api/search?query=${encodeURIComponent(query)}` + // Proxy 설정하면 필요 없음
      `/api/search?query=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&display=${display}`;

    const res = await fetch(url);
    console.log(res);
    return res.json();
  } catch (err) {
    console.error(err);
  }
}
