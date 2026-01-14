// Array.prototype.flat() Test
const arr = [];
arr.push(3);
arr.push([1, 2]);
console.log(arr);
arr.flat(Infinity);
console.log(arr);
// flat은 원본 배열을 변경하지 않고, 평탄화한 복사본을 반환한다.
console.log(arr.flat(Infinity));

arr.push([4, 5]);
console.log(arr.flat());
console.log(arr.flat(2));
