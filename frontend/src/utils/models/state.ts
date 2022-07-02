import { Agenda } from ".";

export interface CalendarAction {
    type: CalendarActionType
    setValue?: {
        agenda: Agenda
        index: number
    }
    cacheValue?: {
        date: (boolean | null)
        coords: {
            row: number
            day: number
        }
    }
}

export enum CalendarActionType {
    SET,
    UPDATE,
    CACHE,
    OFFSET,
}

export interface CalendarState {
    agendas: Agenda[]
    highlight: Agenda
    offset: number
}