class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`안녕, 나는 ${this.name}이야.`);
  }
}

// module.exports를 통해서, 내 파일 내에서 다른 곳에서 가져다 쓸 것을 알려준다.
module.exports = Person;