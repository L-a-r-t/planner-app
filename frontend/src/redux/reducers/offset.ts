import { createSlice } from "@reduxjs/toolkit";

export interface OffsetState {
    value: number
}

const initialState: OffsetState = {
    value: 0
}

export const offsetSlice = createSlice({
    name: 'offset',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= state.value === 0 ? 0 : 1
        },
        reset: (state) => {
            state.value = 0;
        }
    }
})

export const { increment, decrement, reset } = offsetSlice.actions
export default offsetSlice.reducer