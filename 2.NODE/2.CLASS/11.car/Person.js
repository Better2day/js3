const Car = require('./Car');

class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet() {
    console.log(`안녕, 나는 ${this.age}살, ${this.gender}, ${this.name} 이야.`);
  }

  // JS는 동적 타입 언어
  // Java는 getInCar(Car car) 식으로 변수의 타입을 지정. 그러면 인자로 Car 객체만 올 수 있다.
  // TypeScript는 getInCar(car: Car). TS는 딱딱한 언어, 동적 타입 언어가 아니다.
  // TS에서도 동적 타입이 가능. getInCar(car: any) ※ 이유 없이 이렇게 하지 말 것! 이러면 TS를 사용하는 의미가 없다.
  getInCar(car) {
    if (car instanceof Car) {
      console.log(`${this.name}이/가 ${car.brand} ${car.model}에 탑승합니다.`);
    } else {
      console.log(`올바른 자동차를 입력해주세요.`);
    }
  }
}

module.exports = Person;
