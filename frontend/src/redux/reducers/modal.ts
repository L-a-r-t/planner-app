import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "utils/models"

export interface ModalState {
    corner: Modal
    main: Modal
}

const blankModal: Modal = {
    isShowing: false,
    isError: false,
    message: ''
}
const initialState: ModalState = {
    corner: blankModal,
    main: blankModal
}

export interface ShowAction {
    isError: boolean
    message: string
}

export const modalSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
        showCorner: (state, action: PayloadAction<ShowAction>) => {
            state.corner = {
                isShowing: true,
                isError: action.payload.isError,
                message: action.payload.message
            }
        },
        hideCorner: (state) => {
            state.corner = blankModal
        }
    }
})

export const { showCorner, hideCorner } = modalSlice.actions
export default modalSlice.reducer