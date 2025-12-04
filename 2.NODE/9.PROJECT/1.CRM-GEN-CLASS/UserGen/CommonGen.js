class CommonGen {
  generate() {
    throw new Error('이 함수를 구현하시오');
    // 실험: throw 대신에 return을 해도 동일할까?  → 결과: 일반적인 오류와 달리, 간단한 오류 설명 한 줄만 출력 (stack trace 기록 없음)

    // 실험: new 연산자를 사용하지 않아도 동일할까? → 결과: throw, return 모두 동일. Error
    // MDN 검색 결과 (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error/Error)
    // Error를 new 없이 함수로써 호출한 경우에도 Error 객체를 반환합니다.
    // 따라서 단순히 Error를 호출하기만 해도 new 키워드를 사용한 것과 같은 결과를 낳습니다.
  }
}

module.exports = CommonGen;
