import dayjs from "dayjs";

export const dateFormat = (date) => {
  // 어제 시간, 오늘 시간, 그 외는 날짜
  dayjs.locale("ko");
  const getDate = dayjs(date, "YYYY-MM-DD HH:mm");
  const time = dayjs(date).format("hh:mm");
  const today = dayjs();
  const hours = today.diff(getDate, "hours");
  const days = Math.floor(hours / 24);

  if (days === 0) {
    return `오늘 ${time}`;
  } else if (days === 1) {
    return `어제 ${time}`;
  } else {
    return `${getDate.format("YYYY.MM.DD")}`;
  }
};
