// 클래스를 만들고, 함수를 만들고, 그걸 통해서 내가 원하는 정보를 설정하고 가져오는 것

// class Car() { constructor() {} }

class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get diameter() { // getter 함수
    return this.radius * 2;
  }

  set diameter(diameter) {
    this.radius = diameter / 2;
  }
}

const myCircle = new Circle(5);
console.log('반지름: ', myCircle.radius);
console.log('지름: ', myCircle.diameter);
// console.log(myCircle.radius);

myCircle.diameter = 20;
console.log('반지름: ', myCircle.radius);

