const os = require('os');

const hostname = os.hostname();
console.log('내 PC의 호스트 이름은: ', hostname);

const tmpDir = os.tmpdir();
console.log('내 PC의 O/S에서 사용하는 임시 디렉토리는: ', tmpDir);

const cpus = os.cpus();
console.log('내 PC의 CPU의 코어 개수는: ', cpus.length);
console.log('내 PC의 CPU의 첫 번째 코어: ', cpus[0]);

const platform = os.platform();
const version = os.version();
const release = os.release();
console.log(`내 PC의 운영체제는 ${platform}, 버전은 ${version}, 릴리즈는 ${release}`);
