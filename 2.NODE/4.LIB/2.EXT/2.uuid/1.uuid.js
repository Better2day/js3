// 신버전이 문제가 되는 것이니, 구버전을 설치한다.
// npm install uuid@8
// uuidv4를 가져와서 v4 변수에 할당
const { v4: uuidv4 } = require('uuid');

const myid = uuidv4();
console.log('생성된 UUID: ', myid);
