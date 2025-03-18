import { apiConfig } from "./api-config.js";

export async function scheduleNew({id, name, when}){
    try {
        //Faz a requisição para enviar os dados do agendamento
        await fetch(`${apiConfig.baseUrl}/schedules`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, name, when}),
        })

        //exibe a mensagem de agendamento realizado
        alert('Agendamento Realizado.')
    } catch (error) {
        console.log(error)
        alert('Não foi possivel agendar. Tente novamente mais tarde.')
        
    }
}