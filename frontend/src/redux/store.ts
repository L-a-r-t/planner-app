import { configureStore } from '@reduxjs/toolkit'
import offsetReducer from './reducers/offset'
import agendasReducer from './reducers/agendas'
import metadataReducer from './reducers/meta'
import modalReducer from './reducers/modal'

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
    agendas: agendasReducer,
    metadata: metadataReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch