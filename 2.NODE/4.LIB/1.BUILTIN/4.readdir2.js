const fs = require('fs');
const path = require('path');

const basePath = './';

fs.readdir(basePath, (err, files) => {
  if (err) {
    console.log('오류 발생! 일단 끝...');
    return;
  }

  console.log('성공. 결과: ', files);
  files.forEach(file => {
    const filePath = path.join(basePath, file);
    // console.log('파일: ', filePath);
    chckFile(filePath);
  })
});

function chckFile(filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.lg('stat 정보 가져오기 실패');
      return;
    }
    if (stats.isFile()) {
      console.log('이것은 파일입니다: ', filePath);
    } else if (stats.isDirectory()) {
      console.log('이것은 디렉토리입니다: ', filePath);
    } else {
      console.log('이건 뭔지 모르겠습니다.');
    }
  })
}