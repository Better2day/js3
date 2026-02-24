let numbers: number[] = [1, 2, 3, 4, 5];
console.log(`Numbers: ${numbers}`);

let names: string[] = ['Sesac', 'Hello', 'World'];
console.log(`Names: ${names}`);

// 튜플 타입
let person: [string, number] = ['Alice', 30];
console.log(`Person Typle: ${person[0]}, ${person[1]}`);

// person = ['Bob'] // 이런 식으로는 불가능. 정의한 타입으로만 할당 가능
person = ['Bob', 20];
console.log(`Person Typle: ${person[0]}, ${person[1]}`);

// 구조 분해 할당 (아래 username2, age2라고 명명한 이유는, VS Code가 타 파일과 )
// username, age라고 명명해도 무방
const [username2, age2] = person;
console.log(`Person Name: ${username2}, Age: ${age2}`);


// 나만의 타입을 정의하는 것 중 첫 번째 방법: enum
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right // 3
}

let move: Direction = Direction.Up;
console.log(`Direction: ${move}`);

move = Direction.Left;
console.log(`Direction: ${move}`); // 숫자 출력: 2
console.log(`Direction: ${Direction[move]}`); // 문자 출력
console.log(typeof Direction[move]);
console.log(typeof Direction);
// console.log(Direction.length); // 오류 발생. [] 기호가 있어서 배열인가 했는데, 아님

// Union 타입 (두 가지 이상의 타입이 올 수 있는 변수)
let id: number | string;
id = 123;
console.log(`ID 숫자: ${id}`);
id = 'ABC';
console.log(`ID 문자: ${id}`);


// 나만의 타입을 지정하는 두 번째 방식: literal type
let direction: 'left' | 'right' | 'up' | 'down';

direction = 'left'; // 자동완성 안 됨
console.log(`Direction: ${direction}`);
