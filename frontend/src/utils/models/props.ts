import { User } from "@auth0/auth0-react"
import { Agenda } from "."

export interface CalendarProps {
    user?: User
}

export interface DayCardProps {
    available: boolean | null
    row: number
    day: number
}

export interface WeekRowProps {
    agenda?: Agenda
    user?: User
    index: number
}

export interface ButtonProps {
    
}