import dayjs from "dayjs";

import { openHours } from "../../util/opening-hours";
import { hoursClick } from "./hours-click";

const hour = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  //Limpa a lista de horários
  hours.innerHTML = "";

  // Obtem a lista de todos os horários ocupados
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  );

  const opening = openHours.map((hour) => {
    const [scheduleHour] = hour.split(":");

    // Adiciona a hora na date e verifica se está no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());

    const available = !unavailableHours.includes(hour) && !isHourPast;

    return {
      hour,
      available,
    };
  });

  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "9:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });

  //Adiciona o evento de clique nos horários disponíveis
  hoursClick();
}
function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;
  hours.append(header);
}
