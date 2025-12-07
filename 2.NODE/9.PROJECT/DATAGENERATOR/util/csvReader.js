const fs = require('fs');
const csv = require('csv-parser');

// 첫 번째 인자인 csv 파일명만 넣고 호출하면 레코드 전체를 읽어온다.
// 두 번째 인자인 컬럼명을 쉼표로 분리해서 나열하면(예. 'ID', 'Address' 식), 레코드별로 해당 컬럼만 읽어온다.
function readCsv(filenameToRead, ...keysToRead) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filenameToRead)
      .pipe(csv())
      .on('data', data => {
        // { '이름': '홍길동', '나이': '24', '성명': '남성', '생년월일': '2000-01-01' } 중에서
        // 이름, 나이만 저장하려면 어떻게 해야 할까? ['이름', '나이'] 같은 배열을 스프레드해서 주면 확장성
        // 많이 시도해봤는데, 컬럼명으로 이뤄진 문자열 '배열'을 '객체' 리터럴에 스프레드해서 구조 분해 할당하는 게 불가능한 듯
        // ({ ...keysToRead }) => 식으로 함수 호출할 때 필요한 인자를 동적으로 받아서 구조 분해 할당하려고 했더니
        // 원하던대로 { ID, Address }가 되어서 data에서 받아온 레코드의 ID, Address를 구조 분해 할당하는 게 아니라,
        // {0: 'ID', 1: 'Address'}로 되어버려서 구조 분해 할당이 불가능했다. 문법적으로 불가능한 듯 하다.
        // 어쩔 수 없이 아래처럼 수작업으로 처리
        if (keysToRead.length != 0) { // csv 레코드에서 원하는 컬럼이 있을 때
          const recordFilterd = {};
          keysToRead.forEach(key => { // csv 파일에서 읽어온 레코드 중에서 keysToRead에 있는 컬럼만 저장
            recordFilterd[key] = data[key];
          });
          results.push(recordFilterd);
        } else { // csv 레코드 전체를 읽어올 때
          results.push(data);
        }
      })
      .on('end', () => {
        console.log(`${filenameToRead} 파일 읽기 완료`);
        resolve(results);
      });
  })
}

module.exports = { readCsv };
