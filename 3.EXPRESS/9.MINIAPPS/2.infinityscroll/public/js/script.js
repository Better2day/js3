let start = 0;
let end = 10;

async function getItemsFromTo() {
  const response = await fetch(`/api/items?start=${start}&end=${end}`);
  const data = await response.json();
  console.log(data);
  const result = document.getElementById('result');

  data.forEach(item => {
    // console.log(el);
    const itemElement = document.createElement('div');
    itemElement.classList.add('item'); // 디자인을 넣기 위해서 클래스 추가
    itemElement.textContent = item;
    result.appendChild(itemElement);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");

  getItemsFromTo();

  // result.innerHTML = data;
});

window.addEventListener('scroll', () => {
  // console.log('스크롤 발생??', window.innerHeight, window.scrollY);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log('문서 하단에 도달');

    const result = document.getElementById('result');

    start = end;
    end = end + 10;

    getItemsFromTo();
  }
});
