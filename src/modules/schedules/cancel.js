import {schedulesDay} from './load.js'
import { scheduleCancel } from '../../services/schedule-cancel.js';

const periods = document.querySelectorAll('.period');

//gerando evento de click para cada lista (manhã, tarde e noite)
periods.forEach((period)=>{
    //capturando evento de click na lista
    period.addEventListener('click', async (event) =>{
        if(event.target.classList.contains('cancel-icon')){

            //obtendo a li pai do elemento clicado
            const item = event.target.closest('li')

            //pega o id do elemento para remover
            const {id} = item.dataset

            //Confirma se o usuário quer remover o agendamento
            if(id) {
                const isConfirm = confirm('Realmente deseja cancelar o agendamento?')

                if(isConfirm){
                    //faz a requisição na api para cancelar
                    await scheduleCancel({ id })
    
                    //recarrega a lista
                    schedulesDay()
                }
            }  
        }
    })
})