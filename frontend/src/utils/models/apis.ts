import { Agenda } from "."

export interface CalendarData {
    name: string
    description: string
    agendas: Agenda[]
    access: {email: string}[]
    owner: boolean
}

export type CalendarList = {
    id: string
    name: string
    description: string
    public: boolean
    owner: boolean
}[]