const Car = require('./Car');

class SUV extends Car {
  constructor(brand, model) {
    super(brand, model);
  }

  goOffroad() {
    console.log('이게 뭡니까? 갑자기 오프로드를 하겠다고 밭으로 들어갔습니다!! 제 정신입니까 휴먼?');
  }
}

module.exports = SUV;
