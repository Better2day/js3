// interface는 객체의 프로토타입을 정의 (이 객체는 ~를 가지고 있어야 한다고 강제)
interface Person {
  name: string;
  age: number;
  isEmployed: boolean;
  address?: string; // 선택적 속성 정의
}

// 사전에 정의한 기본 객체 속성을 반드시 정의하도록 강제화
// class Admin implements Person {}
// class Employee implements Person {}

class User implements Person {
  name: string;
  age: number;
  isEmployed: boolean;
  // address는 선택적 속성이므로 꼭 구현하지 않아도 된다. 
  address: string = '';

  constructor(name: string, age: number, isEmployed: boolean) {
    this.name = name;
    this.age = age;
    this.isEmployed = isEmployed;
  }

  getInfo(): string {
    if (this.address != '') {
      return `Name: ${this.name}, Age: ${this.age}, Employed: ${this.isEmployed}, Address: ${this.address}`;
    } else {
      return `Name: ${this.name}, Age: ${this.age}, Employed: ${this.isEmployed}, Address: 없음`;
    }
  }
}

const alice: User = new User('Alice', 30, true);
console.log(alice.getInfo());
alice.address = '서울시 강남구';
console.log(alice.getInfo());
