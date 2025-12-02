const url = require('url');

const myURL = 'https://www.example.com/api/path?query=value';
// const myURL = 'https://www.example.com/index.html';
const urlObj = new URL(myURL);

console.log('Host: ', urlObj.host); // www.example.com
console.log('Path: ', urlObj.pathname); // /api/path
console.log(urlObj.pathname.slice(1));  //  api/path
console.log('Query: ', urlObj.search);  // ?query=value
console.log('Hash: ', urlObj.hash);
console.log('Origin: ', urlObj.origin); // https://www.example.com
console.log('Port: ', urlObj.port);
console.log('Protocol: ', urlObj.protocol); // https:
console.log('searchParams: ', urlObj.searchParams); // URLSearchParams { 'query' => 'value' }
