
// 아직 분리 안 됐음. 수정해야 함
function setCsvWriter(filename, header) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: filename,
    header: header
  });
  return csvWriter;
}

function writeCsv(csvWriter, records, fd) {
  csvWriter.writeRecords(records)
    .then(() => {
      console.log(`${fd} CSV 파일 작성 완료`);
    });
}

module.exports = { setCsvWriter, writeCsv };