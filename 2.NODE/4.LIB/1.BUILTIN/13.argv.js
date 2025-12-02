const args = process.argv.slice(2); // 인자 중에서 앞 2개는 현재 예제에서 의미 없으므로 삭제
// 'C:\\Program Files\\nodejs\\node.exe',
// 'D:\\src\\SESAC_JS3\\sesac_js3\\2.NODE\\4.LIB\\1.BUILTIN\\13.argv.js',

// node 13.~.js arg1 arg2 식으로 실행

console.log(args);
console.log('사용자 수: ', args[0]);
console.log('상점 수: ', args[1]);
console.log('주문 수: ', args[2]);

console.log('당신은 사용자 수를 몇 명으로 생성하시겠습니까?');
