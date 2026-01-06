// require('@dotenvx/dotenvx').config()
// 위 require 문이 있으면 콘솔에서 node index.js만 실행해도 .env 파일을 읽어온다.
// 위 require 문이 없으면 콘솔에서 npx dotenvx run -- node index.js 형태로 실행해서 .env 파일을 읽어올 수 있다.

console.log('Hello ' + process.env.HELLO);
