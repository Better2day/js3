class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return '아무 말이나';
  }
}

// 강아지는 동물(Animal) 클래스의 기능을 다 받아오고, +alpha를 추가할 수 있다.
class Dog extends Animal {
  makeDogSound() {
    return '멍멍';
  }
}

class Cat extends Animal {
  makeCatSound() {
    return '야옹';
  }
}


const myDog = new Dog('Doggy');
console.log(myDog.name);
console.log(myDog.makeSound());
console.log(myDog.makeDogSound());
// console.log(myDog.makeCatSound());

const myCat = new Cat('Kitty');
console.log(myCat.name);
console.log(myCat.makeSound());
// console.log(myCat.makeDogSound());
console.log(myCat.makeCatSound());

const myCow = new Animal('한우');
console.log(myCow.name);
console.log(myCow.makeSound());
// console.log(myCow.makeDogSound());
// console.log(myCow.makeCatSound());
