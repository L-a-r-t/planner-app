import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Agenda } from "utils/models";

export interface AgendasState {
    highlighted: {
        agenda: Agenda
        row: number
    } | null
    array: Agenda[]
}

const initialState: AgendasState = {
    highlighted: null,
    array: []
}

export const agendasSlice = createSlice({
    name: 'agendas',
    initialState,
    reducers: {
        /** Adds the highlighted row to top of rows stack.
         * Should be used only on new row
         */
        init: (state, action: PayloadAction<InitAction>) => {
            state.array = action.payload.agendas
        },
        add: (state, action: PayloadAction<UpdateAddAction>) => {
            if (state.highlighted) state.array.push({...state.highlighted.agenda, owner: action.payload.owner})
            state.highlighted = null
        },
        updatehighlighted: (state, action: PayloadAction<UpdateHighlightAction>) => {
            if (!state.highlighted) return
            const payload = action.payload
            state.highlighted.agenda.dates[payload.day] = action.payload.available

        },
        resethighlight: (state) => {
            state.highlighted = null
        },
        /** Pushes 7 new null spots at the end of the highlighted row */
        pushhighlight: (state) => {
            if (!state.highlighted) return
            state.highlighted.agenda.dates.push(...Array(7).fill(null))
        },
        /** Pushes 7 new null spots at the end of specified row */
        push: (state, action: PayloadAction<PushAction>) => {
            state.array[action.payload.row].dates.push(...Array(7).fill(null))
        },
        highlight: (state, action: PayloadAction<HighlightAction>) => {
            if (state.highlighted?.row === action.payload.row) return
            state.highlighted = action.payload
        },
        /** Merges highlighted row and the rest of the agenda */
        update: (state, action: PayloadAction<UpdateAddAction>) => {
            const newArray = state.array.map((_agenda, i) => {
                if (state.highlighted && i === state.highlighted.row) {
                    return {dates: state.highlighted.agenda.dates, owner: action.payload.owner}
                }
                return _agenda
            })
            state.array = newArray
            state.highlighted = null
        },
        erase: (state) => {
            if (!state.highlighted) return
            const newArray = state.array.reduce((arr, _agenda, i) => {
                if (state.highlighted && i === state.highlighted.row) return arr
                arr.push(_agenda)
                return arr
            }, [] as Agenda[])
            state.array = newArray
            state.highlighted = null
        }
    }
})

export const { 
    init,
    add, 
    updatehighlighted, 
    resethighlight, 
    highlight, 
    update, 
    push,
    pushhighlight,
    erase } = agendasSlice.actions
export default agendasSlice.reducer

export interface HighlightAction {
    agenda: Agenda
    row: number
}

export interface UpdateHighlightAction {
    available: boolean | null
    row: number
    day: number
}

export interface PushAction {
    row: number
}

export interface UpdateAddAction {
    owner: string
}

export interface InitAction {
    agendas: Agenda[]
}