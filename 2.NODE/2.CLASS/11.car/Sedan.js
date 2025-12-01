const Car = require('./Car');

class Sedan extends Car {
  constructor(brand, model) {
    super(brand, model);
  }

  startCruiseControl() {
    console.log(`크루즈 컨트롤을 시작했습니다.`);
  }
  stopCruiseControl() {
    console.log(`크루즈 컨트롤을 종료했습니다.`);
  }
}

module.exports = Sedan;
