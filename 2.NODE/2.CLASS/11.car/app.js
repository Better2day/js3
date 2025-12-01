// Car를 상속받은 Sedan, SUV 등이 있음

const SUV = require('./SUV');
const Parent = require('./Parent');
const Child = require('./Child');

const dadCar = new SUV('테슬라', 'Model X');

// Person을 상속받아서 Parent, Child 클래스 생성
const dad = new Parent('빌 게이츠', 40, '남성', '회사원');
const son = new Child('주니어 빌', 20, '남성', '대학교 1학년');

dad.say();
son.say();

// 사람이 차를 타는 함수 구현
dad.getInCar(dadCar);

const myCar = {
  brand: '진로',
  model: '참이슬'
}
son.getInCar(myCar);

// 차에는 움직이는 함수 구현
dadCar.start();
dadCar.goto('미술관');
son.playInCar(dadCar);
dadCar.stop();
