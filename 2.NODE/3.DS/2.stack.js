class Stack {
  constructor() {
    this.stack = {}; // 스택을 저장할 공간
    this.count = 0;
  }

  push(element) {
    this.stack[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.count == 0) {
      return '더 가져랄 게 없소';
    }
    this.count--;
    const result = this.stack[this.count];
    // Memory leak이 발생하는 이유. 달리는 것을 줬고 카운트는 낮췄지만, 실제로 지우지는 않았다.
    return result;
  }

  size() {
    return this.count;
  }
}

const myStack = new Stack();
console.log(myStack.size());

myStack.push('초록색');
myStack.push('노란색');
myStack.push('주황색');
myStack.push('빨강색');

console.log(myStack.size());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.stack);