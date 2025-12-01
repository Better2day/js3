// 꼭 class만 객체가 아니고, 이렇게 변수에 {}를 할당한 것도 객체 (객체 리터럴 바인딩)

const myVarObject = {
  _age: 0,

  get age() {
    return this._age;
  },

  set age(newAge) {
    if (newAge > 0) {
      this._age = newAge;
    } else {
      console.log('나이는 0보다 커야 합니다.');
    }
  }
}

console.log(myVarObject._age); // private 변수라서, 접근은 가능하지만 하지 말라는 의미
console.log(myVarObject.age); // 이렇게 getter 함수를 통해서 접근하라는 얘기
myVarObject.age = 20;
console.log(myVarObject.age);
myVarObject.age = -20;
console.log(myVarObject.age);
