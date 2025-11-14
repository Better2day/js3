document.getElementById("shuffle-btn").addEventListener("click", shuffleSeats);

const studentNames = [
  "학생1", "학생2", "학생3", "학생4", "학생5",
  "학생6", "학생7", "학생8", "학생9", "학생10",
  "학생11", "학생12", "학생13"
];

function shuffleSeats() {
  // 학생 이름 배열을 무작위로 섞기
  const shuffledNames = studentNames.slice();  // 배열 복사
  for (let i = shuffledNames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
  }

  // 무작위로 섞인 이름을 각 자리에 반영
  let seatIndex = 0;
  for (let i = 1; i <= 13; i++) {
    if (document.getElementById(`seat-${i}`).classList.contains('empty')) {
      continue;  // 빈 공간은 건너뛰기
    }
    document.getElementById(`seat-${i}`).textContent = shuffledNames[seatIndex];
    seatIndex++;
  }

  // 추첨 결과 표시
  document.getElementById("result").textContent = "자리 배치가 완료되었습니다!";
}
