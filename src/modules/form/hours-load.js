import dayjs from "dayjs";

import { openHours } from "../../util/opening-hours";

export function hoursLoad({ date }) {
  const opening = openHours.map((hour) => {
    const [scheduleHour] = hour.split(":");

    // Adiciona a hora na date e verifica se está no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());

    return {
      hour,
      available: isHourPast,
    };
  });
}
