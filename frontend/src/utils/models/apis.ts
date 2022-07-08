import { Agenda } from "."

export interface CalendarData {
    name: string
    description: string
    agendas: Agenda[]
    access: {email: string}[]
    owner: boolean
}