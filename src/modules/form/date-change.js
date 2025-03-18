import {schedulesDay} from '../schedules/load.js'

//selecionando o input de data
const selectedDate = document.getElementById('date');


//recarregando a lista de horários quando o input de datas mudar
selectedDate.onchange = () => schedulesDay()