// 신버전 문법
// 기존 require 무법을 전부 import로 변경
// package.json 파일에 "type": "module" 추가
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

const myid = uuidv4();
console.log('생성된 UUID: ', myid);
