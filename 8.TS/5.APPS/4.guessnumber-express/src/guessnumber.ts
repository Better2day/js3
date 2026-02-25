// npm install -D @types/node 설치 필요
// 그리고 tsconfig에 "types": ["node"] 추가

import readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let attempts: number = 0;
const maxAttempts: number = 7;

export interface IGuessResponse {
  result: string,
  attempts: number,
  maxAttempts: number
}

export function guessNumber(target: number, guess: number): IGuessResponse {
  attempts++;

  let guessResult: string = '';
  if (guess < target) guessResult = 'Too Low';
  else if (guess > target) guessResult = 'Too High';
  else guessResult = 'Correct';

  return {
    result: guessResult,
    attempts,
    maxAttempts
  };
}

export const targetNumber: number = Math.floor(Math.random() * 100) + 1; // 1~100 사이 정수
console.log('목표 숫자: ', targetNumber);

// const userGuess: number = 50; // 사용자가 추측한 숫자
// console.log(guessNumber(targetNumber, userGuess));

function askGuess(): void {
  attempts++;

  rl.question(`(${attempts}/${maxAttempts}회 도전중) 숫자를 입력하세요: `, (input: string) => {
    const userGuess: number = Number(input);

    if (isNaN(userGuess)) {
      console.log('숫자만 입력하시오.');
      attempts--;
      return askGuess();
    }

    const result: IGuessResponse = guessNumber(targetNumber, userGuess);
    console.log(result);

    if (result.result == 'Correct') { // 여기 수정?
      console.log('정답을 맞췄습니다!');
      rl.close();
      return;
    }

    if (attempts < maxAttempts) {
      askGuess(); // 다음 시도
    } else {
      console.log(`실패. 모든 횟수를 다 사용했습니다. 정답은 ${targetNumber}입니다.`);
      rl.close();
    }
  });
}

// askGuess();
