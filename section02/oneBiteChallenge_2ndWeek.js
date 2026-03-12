/*
    Quiz 1. 음식 주문 내역 정리하기 (feat. 배열 메서드)
    
    목표 : 배열 메서드를 활용하여 주문 내역을 필터링하고 변환하는 함수 getOrderSummary를 완성하세요
    
    다음 요구사항을 만족하는 코드를 작성하세요
      - 매개변수 orders로 주문 내역 배열을 제공받습니다.
      - status가 "completed"인 주문만 필터링합니다.
      - 필터링된 주문을 "{메뉴명} - {수량}개 (총 {price * quantity}원)" 형태의 문자열 배열로 변환합니다.
      - 변환된 배열을 반환합니다.
      - Hint: filter와 map을 활용하세요!
*/
function getOrderSummary(orders) {
  const completedOrders = orders.filter((order) => order.status === 'completed');
  const refinedSummary = completedOrders.map(
    (item) => `${item.menu} - ${item.quantity}개 (총 ${item.price * item.quantity}원)`,
  );

  return refinedSummary;
}

const result = getOrderSummary([
  { menu: '아메리카노', price: 3000, quantity: 2, status: 'completed' },
  { menu: '카페라떼', price: 3500, quantity: 1, status: 'cancelled' },
  { menu: '크로와상', price: 2800, quantity: 3, status: 'completed' },
  { menu: '케이크', price: 5000, quantity: 1, status: 'completed' },
  { menu: '녹차라떼', price: 4000, quantity: 2, status: 'cancelled' },
]);

console.log(result);

// 출력 결과 :
// ["아메리카노 - 2개 (총 6000원)", "크로와상 - 3개 (총 8400원)", "케이크 - 1개 (총 5000원)"]


/*
    Quiz 2. 타이머 기능 만들기 (feat. 비동기)

    목표 : Promise와 async/await를 활용하여 카운트다운 타이머를 만드세요

    다음 요구사항을 만족하는 코드를 작성하세요
      - 함수 wait는 매개변수 ms만큼 대기했다가 resolve를 호출하는 Promise를 반환합니다.
      - 함수 countdown은 매개변수 seconds를 받아 1초 간격으로 카운트다운을 출력합니다.
      - await와 wait 함수를 활용하세요!
      - 카운트다운이 끝나면 "🎉 타이머 종료!" 를 출력합니다.
      - 예외가 발생할 경우를 대비해 에러 핸들링 코드를 추가하세요
*/
function wait(ms, current = null, isReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isReject) {
        reject(`${current}초에서 타이머가 중단되었습니다!`);
        return;
      }
      
      resolve();
    }, ms);
  });
}

async function countdown(seconds, rejectAt = null) {
  try {
    if (/^[-+]?(\d+|Infinity)$/.test(rejectAt)) {
      rejectAt = Number(rejectAt);
    } 
    else if(rejectAt === null) {}
    else {
      rejectAt = NaN;
    }

    if (isNaN(rejectAt)) throw new Error('두번째 인수(rejectAt)는 생략하거나 혹은 반드시 숫자여야 합니다.');

    for (let i = seconds; i >= 1; i--) {
      await wait(1000, i, i === rejectAt);
      console.log(i);
    }
    console.log('🎉 타이머 종료!');
  } catch (error) {
    console.error(error);
  }
}

// countdown(5);
countdown(5, '2'); // reject 테스트용

// 출력 결과 : (1초 간격으로 출력)
// 5
// 4
// 3
// 2
// 1
// 🎉 타이머 종료!
