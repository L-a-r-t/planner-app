import { Agenda } from "."

export interface CalendarData {
    name: string
    description: string
    lastViewed: Date
    agendas: Agenda[]
}