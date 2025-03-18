import dayjs from "dayjs";
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({date}){
    try {
        //fazendo a requisição
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)

        const data = await response.json();

        const dailySchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, 'day')
        )

        return dailySchedules
    } catch (error) {
        alert('Não foi possivel buscar os agendamentos no dia selecionado')
        console.log(error)
    }
}