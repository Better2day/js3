function setCsvWriter(filenameToWrite, header) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: filenameToWrite,
    header: header
  });
  return csvWriter;
}

function writeCsv(csvWriter, records, filenameToWrite) {
  csvWriter.writeRecords(records)
    .then(() => {
      console.log(`${filenameToWrite} 파일 생성 완료`);
    });
}

module.exports = { setCsvWriter, writeCsv };
