import dayjs from "dayjs";

import {scheduleNew} from '../../services/schedule-new.js'
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector('form');
const selectedDate = document.getElementById('date');
const clientName = document.getElementById('client')

//data atual
const inputToday = dayjs(new Date()).format('YYYY-MM-DD');

//carregando data atual
selectedDate.value = inputToday;

//define a data minima para cadastro
selectedDate.min = inputToday;


form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        //recuperando o nome do cliente
        const name = clientName.value.trim()
        
        if(!name){
            return alert("Informe o nome do cliente")
        }

        //recuperando o horário selecionado
        const hourSelected = document.querySelector('.hour-selected')

        if(!hourSelected){
            return alert("Selecione o horário para agendamento")
        }

        //recuperar somente a hora
        const [hour] = hourSelected.innerText.split(':')


        //inserindo a hora na data]
        const when = dayjs(selectedDate.value).add(hour, 'hour')

        //gerando um ID
        const id = new Date().getTime().toString()
        
        await scheduleNew({id, name, when})
        await schedulesDay()
        clientName.value =''
        
    } catch (error) {
        alert('não foi possivel realizar o agendamento')
        console.log(error)
    }
}