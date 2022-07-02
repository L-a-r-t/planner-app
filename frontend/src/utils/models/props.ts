import { Agenda } from "."

export interface CalendarProps {
    agendas?: Agenda[]
    updateAgenda: (agenda: Agenda, index: number, offset: number, delta: number) => void
}

export interface DayCardProps {
    available: boolean | null
    row: number
    day: number
}

export interface WeekRowProps {
    agenda?: Agenda
    index: number
}

export interface ButtonProps {
    
}