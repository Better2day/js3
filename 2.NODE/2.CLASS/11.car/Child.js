const Person = require('./Person');
const Car = require('./Car');

class Child extends Person {
  constructor(name, age, gender, grade) {
    super(name, age, gender);
    this.grade = grade;
  }

  say() {
    console.log(`${this.name} ${this.age} ${this.gender}입니다`);
  }

  playInCar(Car) {
    console.log(`${this.name}이/가 ${Car.brand} ${Car.model} 안에서 놀고 있습니다`);
  }
}

module.exports = Child;
