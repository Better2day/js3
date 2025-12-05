function processArgs(args, fileName) {
  // 첫 번째 인자가 없거나, 숫자/정수가 아니거나, 음의 정수이면 앱 사용법 출력
  if (typeof args[0] == 'undefined' || !Number.isInteger(parseInt(args[0])) || parseInt(args[0]) < 0) {
    console.log(`Usage: node ${fileName} outputQty[, stdout]`);
    console.log('stdout: csv or console. Default: csv');
    return -1;
  }
  // 두 번째 인자가 없으면 기본값인 csv로 설정
  if (typeof args[1] == 'undefined') {
    args[1] = 'csv';
  }

  // 두 번째 인자를 소문자로 변환
  args[1] = args[1].toLowerCase();

  // 두 번째 인자가 csv 또는 console이 아니면 앱 사용법 출력
  if (!['csv', 'console'].includes(args[1])) {
    console.log('두 번째 인자에 올바른 출력 매체명을 입력해주세요. (입력하지 않으면 기본값: csv)');
    console.log('stdout: csv or console');
    return -1;
  }
}

module.exports = { processArgs };
