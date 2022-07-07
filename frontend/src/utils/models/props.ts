import { Agenda } from "."

export interface DayCardProps {
    available: boolean | null
    row: number
    day: number
}

export interface WeekRowProps {
    agenda?: Agenda
    index: number
}