function getFileInfo(paramFile) {
  const fileName = paramFile.split('\\').slice(-1)[0];
  const csvFileName = fileName.split('.')[0].toLowerCase() + '.csv';

  return { fileName, csvFileName };
}

module.exports = { getFileInfo };
