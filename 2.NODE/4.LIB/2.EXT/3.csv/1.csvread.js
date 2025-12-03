const csv = require('csv-parser'); // 우리가 설치한 외부 모듈 (npm i csv-parser 명령)

const fs = require('fs');
const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });

