// Date 객체를 'YYYY-MM-DD'형식의 문자열로 반환하는 함수
function getStringedDate(targetDate) {
  // 날짜 -> YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  // month, date의 데이터 포맷을 2자리로 맞춰주기
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

  return `${year}-${month}-${date}`;
}

export { getStringedDate };