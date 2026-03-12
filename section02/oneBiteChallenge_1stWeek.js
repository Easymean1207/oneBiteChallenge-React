/* 
    1. 평균 성적 출력하기
    목표: 학생들의 평균 성적을 출력합니다
    - 매개변수 students로 객체 형태의 학생 데이터를 제공받습니다
    - 반복문을 활용하여 모든 학생의 개별 성적 평균을 출력합니다
      - "{이름} : {평균}" 형태로 출력합니다.
*/
function printAvgScore(students) {
  for (let name in students) {
    let student = students[name];
    let totalScore = 0;
    for (let score of student.scores) {
      totalScore += score;
    }
    let avg = totalScore / student.scores.length;
    console.log(`${name}: ${avg}`);
  }
}

printAvgScore({
  이정환: { hobby: "테니스", scores: [10, 20, 30, 40, 50] },
  김효빈: { hobby: "테니스", scores: [90, 80, 30, 70, 50] },
  홍길동: { hobby: "의적", scores: [100, 100, 20, 20, 50] },
});
// 출력 결과 :
// 이정환: 30
// 김효빈: 64
// 홍길동: 58
console.log();


/* 
    2. 영화 출연진 합치기
    목표: Spread 연산자와 Rest 매개변수를 활용하여 여러 영화의 출연진을 하나로 합치는 함수 mergeActors를 완성하세요
    - 함수 mergeActors는 Rest 매개변수를 사용하여 여러 개의 영화 객체를 인수로 받습니다.
    - 모든 영화의 actors 배열을 Spread 연산자를 활용하여 하나의 배열로 합칩니다.
    - 합쳐진 출연진 배열에서 중복을 제거한 뒤 결과를 출력합니다.
      - Hint: new Set()을 활용하면 중복 제거를 할 수 있습니다.
*/
function mergeActors(...movies) {
  let allActors = [];
  for (let movieIdx in movies) {
    allActors = [...allActors, ...movies[movieIdx].actors];
  }
  let uniqueActors = [...new Set(allActors)];
  console.log("전체 출연진 :", uniqueActors); 
}

mergeActors(
  { title: '하얼빈', actors: ['현빈', '박정민', '전여빈'] },
  { title: '소방관', actors: ['현빈', '유아인', '공효진'] },
  { title: '서울의 봄', actors: ['황정민', '정우성', '박정민'] },
);
// 출력 결과 :
// 전체 출연진: ["현빈", "박정민", "전여빈", "유아인", "공효진", "황정민", "정우성"]
console.log();


/* 
    3. 영화 티켓 할인 적용하기
    목표: 콜백함수와 단락 평가를 활용하여 영화 티켓의 최종 가격을 계산하는 함수 calcTicketPrice를 완성하세요
    - 함수 calcTicketPrice는 3개의 매개변수를 받습니다.
      - price: 기본 티켓 가격
      - discountFn : 할인 금액을 계산하는 콜백함수 (없을 수도 있음)
      - memberName : 회원 이름 (없을 수도 있음)
    - discountFn이 존재하면 콜백함수를 실행하여 할인된 가격을 계산하고, 없으면 기본 가격을 그대로 사용합니다.
      - 단락 평가를 활용하세요!
    - memberName이 없는 경우 "비회원"으로 표시합니다.
      - 단락 평가를 활용하세요!
    - 결과를 "{이름} - 최종 가격 : {가격}원" 형태로 출력합니다.
*/
function calcTicketPrice(price, discountFn, memberName) {
  const finalPrice = discountFn ? discountFn(price) : price;
  const name = memberName || "비회원";
  console.log(`${name} - 최종 가격 : ${finalPrice}원`);
}

calcTicketPrice(15000, (price) => price * 0.8, "김효빈");
// 출력 결과 :
// 김효빈 - 최종 가격 : 12000원

calcTicketPrice(15000, null, "이정환");
// 출력 결과 :
// 이정환 - 최종 가격 : 15000원

calcTicketPrice(15000, (price) => price - 3000);
// 출력 결과 :
// 비회원 - 최종 가격 : 12000원
console.log();


/* 
    4. 카페 주문 영수증 출력하기
    목표: 카페 주문 정보가 담긴 객체를 매개변수로 받아 영수증을 출력하는 함수 printReceipt를 완성하세요
    - 함수 printReceipt는 구조 분해 할당을 통해 인수로 전달된 주문 정보 객체의 프로퍼티들을 각각 제공받습니다.
    - 매개변수로 제공된 주문 정보들을 다음과 같이 출력합니다.
    - 주문자는 "주문자 : {이름}" 형태로 출력합니다.
    - 대표 메뉴를 "대표 메뉴 : {메뉴명}" 형태로 출력합니다.
      - 배열의 구조 분해 할당을 이용하세요
      - 메뉴가 없는 경우 "메뉴 없음"으로 출력합니다.
    - 총 수량은 "총 수량 : {items 배열의 길이}잔" 형태로 출력합니다.
*/
function printReceipt({ customer, items }) {
  const [mainMenu] = items;
  const mainMenuOutput = mainMenu || "메뉴 없음";
  console.log(`주문자 : ${customer}`);
  console.log(`대표 메뉴 : ${mainMenuOutput}`);
  console.log(`총 수량 : ${items.length}잔`);
}

printReceipt({
  customer: "김효빈",
  items: ["아메리카노", "카페라떼", "바닐라라떼"],
});
// 출력 결과 :
// 주문자 : 김효빈
// 대표 메뉴 : 아메리카노
// 총 수량 : 3잔

printReceipt({
  customer: "이정환",
  items: [],
});
// 출력 결과 :
// 주문자 : 이정환
// 대표 메뉴 : 메뉴 없음
// 총 수량 : 0잔
console.log();


/*
  5. 게임 랭킹 필터링하기
  목표: 반복문과 조건문을 활용하여 조건에 맞는 플레이어만 골라내는 함수 filterRanking을 완성하세요
  - 함수 filterRanking은 2개의 매개변수를 받습니다.
    - players : 플레이어 정보 배열
    - minScore : 최소 점수 기준
  - 반복문을 활용하여 players 배열을 순회합니다.
  - 점수(score)가 minScore 이상인 플레이어만 골라냅니다.
  - 조건을 만족하는 플레이어를 "{등수}등 - {닉네임} ({점수}점)" 형태로 출력합니다.
    - 등수는 필터링 된 결과 기준이 아닌, 원래 배열의 순서(인덱스 + 1)를 사용합니다.
  - 조건을 만족하는 플레이어가 없으면 "조건을 만족하는 플레이어가 없습니다." 를 출력합니다.
*/
function filterRanking(players, minScore) {
  let hasQualifiedPlayer = false;
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.score >= minScore) {
      console.log(`${i+1}등 - ${player.nickname} (${player.score}점)`);
      hasQualifiedPlayer = true;
    }
  }
  if (!hasQualifiedPlayer) {
    console.log("조건을 만족하는 플레이어가 없습니다.");
  }
}

filterRanking(
  [
    { nickname: "ProGamer", score: 950 },
    { nickname: "Noob123", score: 120 },
    { nickname: "SilverFox", score: 730 },
    { nickname: "GoldKing", score: 880 },
    { nickname: "BronzeHero", score: 310 },
  ],
  700
);
// 출력 결과 :
// 1등 - ProGamer (950점)
// 3등 - SilverFox (730점)
// 4등 - GoldKing (880점)

filterRanking(
  [
    { nickname: "Newbie1", score: 50 },
    { nickname: "Newbie2", score: 30 },
  ],
  500
);
// 출력 결과 :
// 조건을 만족하는 플레이어가 없습니다.