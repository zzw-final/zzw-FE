const moment = require("moment");

export const dateFormat = (date) => {
  // 어제 시간, 오늘 시간, 일주일 전 이면 요일과 시간
  const getDate = moment(date);
  const time = getDate.format("hh:mm");
  const today = moment();
  const checkDate = today
    .subtract(today.diff(getDate, "days"), "days")
    .calendar("");

  if (checkDate.includes("Monday")) {
    return `월요일 ${time}`;
  } else if (checkDate.includes("Tuesday")) {
    return `화요일 ${time}`;
  } else if (checkDate.includes("Wednesday")) {
    return `수요일 ${time}`;
  } else if (checkDate.includes("Thursday")) {
    return `목요일 ${time}`;
  } else if (checkDate.includes("Friday")) {
    return `금요일 ${time}`;
  } else if (checkDate.includes("Saturday")) {
    return `토요일 ${time}`;
  } else if (checkDate.includes("Sunday")) {
    return `일요일 ${time}`;
  } else if (checkDate.includes("Today")) {
    return `오늘 ${time}`;
  } else if (checkDate.includes("Yesterday")) {
    return `어제 ${time}`;
  } else {
    return `${getDate.format("YY년 MM월 DD일")}`;
  }
};
