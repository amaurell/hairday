import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

//Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

//Carrega a data atual e define a data minima - as anteriores ficam desabilitadas
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    //Recuperando o nome do cliente
    const name = clientName.value.trim();

    if (!name) {
      return alert("Informe o nome do cliente!");
    }

    //Recupera o horario selecionado
    const hourSelected = document.querySelector(".hour-selected");

    //Recupera o horario selecionado
    if (!hourSelected) {
      return alert("Selecione a hora");
    }

    const [hour] = hourSelected.innerText.split(":");

    //Insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour");

    const id = new Date().getTime();
    console.log("Enviando dados:", JSON.stringify({ id, name, when }));

    await scheduleNew({ id, name, when });
  } catch (error) {
    alert("Não foi possível realizar o agendamento");
  }
};
