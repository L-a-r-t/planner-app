import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MetadataState {
    name: string
    description: string
}

const initialState: MetadataState = {
    name: '',
    description: '',
}

export interface MetadataAction {
    name: string
    description: string
}

export const metadataSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<MetadataAction>) => {
            state.name = action.payload.name
            state.description = action.payload.description
        }
    }
})

export const { set } = metadataSlice.actions
export default metadataSlice.reducer