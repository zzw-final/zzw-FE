import dayjs from "dayjs";
const localizedFormat = require("dayjs/plugin/localizedFormat");
const calendar = require("dayjs/plugin/calendar");

export const dateFormat = (date) => {
  // 어제 시간, 오늘 시간, 그 외는 날짜
  dayjs.locale("ko");
  dayjs.extend(localizedFormat);
  dayjs.extend(calendar);

  const getDate = dayjs(date, "YYYY-MM-DD HH:mm");

  return dayjs(getDate).calendar(null, {
    sameDay: "[오늘] h:mm A",
    lastDay: "[어제] h:mm A",
    lastWeek: "DD/MM/YYYY",
    sameElse: "DD/MM/YYYY",
  });
};
