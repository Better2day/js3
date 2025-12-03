const names = ['홍길동', '김길동', '박길동', '이길동'];

function generateName() {
  const index = Math.floor(Math.random() * names.length);
  // console.log(index);
  return names[index];
}

function generateGender() {
  const prob = Math.random();
  if (prob < 0.5) {
    return '남성';
  } else {
    return '여성';
  }
}

function generateGender2() {
  return (prob < 0.5) ? '남성' : '여성';

}

function generateBirthdate() {
  const year = Math.floor(Math.random() * 40) + 1980; // 0 ~ 39 + 1980 = 1980 ~ 2019
  const month = Math.floor(Math.random() * 12) + 1; // 0 ~ 11 + 1 = 1 ~ 12
  const day = Math.floor(Math.random() * 30 + 1); // 0 ~ 29 + 1 = 1 ~ 30
  // 윤달 같은 것 처리하려면 아래처럼. 쉽게 하고 싶으면 일자는 0 ~ 28 로 고정해도 된다.
  if (month == 2) {

  }


  return `${year}-${month}-${day}`;
}

console.log(generateGender());
console.log(generateGender2());
