class Car {
  constructor(make, model) { // 객체가 만들어질 때
    this.brand = make;
    this.model = model;
  }

  welcome() {
    return this.brand + ' ' + this.model + '입니다.';
  }

  drive() {
    return `${this.model}가 자동운전을 시작합니다.`
  }
}

const myCar = new Car('현대', 'K5');
console.log(myCar.brand);
console.log(myCar.model);
console.log(myCar.welcome());
console.log(myCar.drive());

const yourCar = new Car('기아', 'Morning');
console.log(yourCar.brand);
console.log(yourCar.model);
