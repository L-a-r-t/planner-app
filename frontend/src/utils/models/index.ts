export * as hooks from './hooks'
export * as apis from './apis'
export * as props from './props'
export * as styles from './styles'

export interface Agenda {
    owner: string
    dates: (boolean | null)[]
}

export type DateTable = {
    week: number
    dates: (boolean | null)[]
}

export interface CalendarMetadata {
    name: string
    description: string
    lastViewed: Date
}

export interface Modal {
    isShowing: boolean
    isError: boolean
    message: string
}