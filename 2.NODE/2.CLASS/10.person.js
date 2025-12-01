class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet() {
    console.log(`안녕하세요. 저는 ${this.age}살, ${this.name} 입니다.`);
  }

  walk() {
    console.log(`${this.name}은/는 걷고 있습니다.`);
  }

  eat() {
    console.log(`${this.name}은 ${this.place}에서 밥을 먹고 있습니다.`);
  }

  goto(place) { // setter는 아니다. setter라면 set goto(place)로 정의하고, 사용할 때 person1.goto = '공원' 식으로 사용
    this.place = place;
  }
}

const person1 = new Person('철수', 25, '남성');
// console.log(person1.name);
person1.greet();
person1.walk();
person1.place = '공원'; // 이렇게 객체에 멤버를 바로 추가할 수 있지만 좋은 방법이 아니라서 하지 않아야 한다. (보통 다른 언어는 오류 발생)
person1.eat();

const person2 = new Person('영희', 22, '여성');
person2.greet();
person2.walk();
person2.eat();
person2.goto('편의점'); // 올바르게 getter/setter 또는 함수를 통해서 접근
person2.eat();
