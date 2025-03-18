import {apiConfig} from './api-config.js'

export async function scheduleCancel({id}) {
    try {
        await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
            method: 'DELETE',
        })

        alert('Agendamento Cancelado!')
    } catch (error) {
        console.log(error)
        alert('Não foi possivel cancelar o agendamento. Tente novamente mais tarde!')
    }
}
