import dayjs from 'dayjs';
import {openingHours} from '../../utils/opening-hours.js';
import { hoursClick } from './hours-click.js';

const hours = document.getElementById('hours')

export function hoursLoad({date, dailySchedules}){
    const opening = openingHours.map((hour)=>{
        //limpando a lista de horários
        hours.innerHTML = ''

        //obtem a lista de todos os horários ocupados
        const unavailableHours = dailySchedules.map((schedule) => 
            dayjs(schedule.when).format('HH:mm')
    )

        //recuperando somente a hora
        const [scheduleHour] = hour.split(':')

        //adiciona a hora no date e verifica se está no passado
        const isHourPast = dayjs(date).add(scheduleHour, 'hour').isBefore(dayjs())


        const available = !unavailableHours.includes(hour) && !isHourPast

        //define se o horário está disponível
        return{
            hour,
            available,
        }
    })


    //renderizando os horários
    opening.forEach(({hour, available}) => {
        const li = document.createElement('li');
        li.classList.add('hour');
        li.classList.add(available ? 'hour-available': 'hour-unavailable');

        li.textContent = hour;

        if(hour === '09:00'){
            hourHeaderAdd('Manhã')
        } else if(hour === '13:00'){
            hourHeaderAdd('Tarde')
        } else if (hour === '18:00'){
            hourHeaderAdd('Noite')
        }

        hours.appendChild(li)
    })

    //adicionando evento de click nos horários disponíveis
    hoursClick()
}

function hourHeaderAdd(title) {
    const header = document.createElement('li')

    header.classList.add('hour-period')
    header.textContent = title

    hours.append(header)
}