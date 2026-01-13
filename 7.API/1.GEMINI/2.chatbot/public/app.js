const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');
const chatbox = document.getElementById('chatbot');

function add(role, text) {
  // console.log(`Role: ${role}, Text: ${text}`);

  const bubble = document.createElement('div');
  bubble.className = "mb-2";
  bubble.className = `d-flex ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`;

  const badge = role === 'user'
    ? `<span class="badge text-bg-primary text-white me-2">나</span>`
    : `<span class="badge bg-secondary-subtle text-dark me-2">Bot</span>`;

  bubble.innerHTML = `${badge}<span>${text}</span>`;
  chatbox.appendChild(bubble);
  chatbox.scrollTop = chatbox.scrollHeight; // 자동으로 스크롤바 가장 아래로 내리기
}

async function chat(message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await res.json();

  return data.reply;
}


async function send() {
  const text = input.value.trim();
  if (!text) return;

  add('user', text); // 내가 입력한 메시지 출력하기

  try {
    const reply = await chat(text);
    add('bot', reply); // 응답 메시지 출력하기
    input.value = '';
  } catch (err) {
    add('bot', err); // 화면에 오류 메시지 출력하기
  }
}

sendBtn.addEventListener('click', send);

input.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    send();
    // sendBtn.click();
  }
});
