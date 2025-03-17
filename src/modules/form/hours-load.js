import dayjs from "dayjs";

import { openHours } from "../../util/opening-hours";

const hour = document.getElementById("hours");

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

  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;
    hours.append(li);
  });
}
