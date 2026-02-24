// CommonJs style 사용하지 않고, ESM style 사용
import { add, sub } from './math';
import { toLower, toUpper } from './string';

console.log(`덧셈: ${add(10, 5)}`);
console.log(`뺄셈: ${sub(10, 5)}`);

console.log(`대문자화: ${toUpper('SeSAC')}`);
console.log(`소문자화: ${toLower('SeSAC')}`);
