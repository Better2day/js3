class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return '아무 말이나';
  }
}

class Dog extends Animal {
  makeSound() { // overriding. 상속받은 부모의 원래 기능을 새 기능으로 대체
    return '멍멍';
  }
}

class Cat extends Animal {
  makeSound() { // overriding. 상속받은 부모의 원래 기능을 새 기능으로 대체
    return '야옹';
  }
}

const myDog = new Dog('Doggy');
console.log(myDog.name);
console.log(myDog.makeSound());
// console.log(myDog.makeDogSound());
// console.log(myDog.makeCatSound());

const myCat = new Cat('Kitty');
console.log(myCat.name);
console.log(myCat.makeSound());
// console.log(myCat.makeDogSound());
// console.log(myCat.makeCatSound());

const myCow = new Animal('한우');
console.log(myCow.name);
console.log(myCow.makeSound());
// console.log(myCow.makeDogSound());
// console.log(myCow.makeCatSound());
