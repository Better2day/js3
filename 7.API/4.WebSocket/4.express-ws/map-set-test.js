const map1 = new Map();

map1.set("a", 1);
map1.set("b", 2);
map1.set("c", 3);

console.log(map1); // { 'a' => 1, 'b' => 2, 'c' => 3}
// console.log(map1.toString()); // [Object Map]
// console.log(JSON.stringify(map1)); // {}

console.log(map1.size); // 3
console.log(map1.get('a')); // 1
console.log(map1.has('b')); // true
console.log(map1.keys()); // { 'a', 'b', 'c' }
console.log(map1.values()); // { 1, 2, 3}
console.log(map1.entries()); // { ['a', 1], ['b', 2], ['c', 3] }
console.log('--------------------------------------------------------------------------------------------------------------');

map1.delete('b'); // Map 안의 키-값 쌍 중에서 delete의 인수에 해당하는 키를 가진 키-값 쌍 삭제
// map1.delete(2); // delete 인수로 키-값 쌍에서 값을 줘서 삭제할 수는 없다.
console.log(map1.size); // 2
console.log(map1.has('b')); // false
console.log(map1.keys()); // { }
console.log(map1.values()); // { }
console.log(map1.entries()); // { }
console.log('--------------------------------------------------------------------------------------------------------------');

// map1.clear(); // Map 안에 들어 있는 키-값 쌍 전부 지우기
// console.log(map1.size); // 0
// console.log(map1.has('b')); // false
// console.log(map1.keys()); // { }
// console.log(map1.values()); // { }
// console.log(map1.entries()); // { }

map1.forEach(value => {
  console.log(value);
});
console.log('--------------------------------------------------------------------------------------------------------------');

map1.forEach((value, key) => {
  // console.log(`${key}: ${value}`);
  // console.log(key + ' ' + value);
  console.log(key + ' => ' + value);
});
console.log('--------------------------------------------------------------------------------------------------------------');

console.log(map1.a); // 객체처럼 키로 접근 불가. 키-값 쌍이 여러 개 있는 형태이므로 당연한건가
console.log(map1['a']); // "
console.log(map1[0]); // 배열처럼 요소 인덱스로도 접근 불가. 키-값 쌍이 여러 개 있는 형태이므로 당연한건가
console.log('--------------------------------------------------------------------------------------------------------------');

const arr1 = [1, 3, 2, 4, 3, 3, 7, 7, 8];
console.log(arr1); // [1, 3, 2, 4, 3, 3, 7, 7, 8]
console.log(new Set(arr1)); // Set(6) [1, 3, 2, 4, 7, 8]
console.log(new Array(new Set(arr1))); // [ Set(6) [1, 3, 2, 4, 7, 8] ]
console.log(new Array(...new Set(arr1))); // [1, 3, 2, 4, 7, 8]
console.log(Array.from(new Set(arr1))); // [1, 3, 2, 4, 7, 8]
console.log([...new Set(arr1)]); // [1, 3, 2, 4, 7, 8] 이 방법이 제일 깔끔한 듯
console.log(arr1.filter((v, i, arr) => arr.indexOf(v) === i)); // 배열 고차함수를 이용해서 Set 없이 처리
