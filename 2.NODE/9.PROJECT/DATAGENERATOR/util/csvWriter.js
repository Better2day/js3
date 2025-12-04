
// 아직 분리 안 됐음. 수정해야 함
function writeCSV(filename, header) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  // const csvWriter = createCsvWriter({
}

module.exports = { writeCSV };