import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"

const reducers = {}

const store = configureStore({
    reducer: reducers
})

export type StoreState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export interface AppThunkProps {
    dispatch: AppDispatch;
    state: StoreState;
    extra?: unknown;
    rejectValue?: unknown;
}

export const useDispatch = () => useStoreDispatch<AppDispatch>()

export default store