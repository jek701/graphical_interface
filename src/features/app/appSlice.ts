import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CircleProps, EllipseProps, HyperbolaProps, ParabolaProps} from "../../components/Canvas"
import {useSelector} from "react-redux"
import {StoreState} from "../../store"

export interface StateProps {
    circle: {
        centerX: number,
        centerY: number,
        radius: number
    }
    ellipse: {
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number
    }
    hyperbola: {
        centerX: number
        centerY: number
        a: number
        b: number
    }
    parabola: {
        focusX: number
        focusY: number
        p: number
    }
}

const initialState: StateProps = {
    circle: {
        centerX: 0,
        centerY: 0,
        radius: 0
    },
    ellipse: {
        centerX: 0,
        centerY: 0,
        radiusX: 0,
        radiusY: 0
    },
    hyperbola: {
        centerX: 0,
        centerY: 0,
        a: 0,
        b: 0
    },
    parabola: {
        focusX: 0,
        focusY: 0,
        p: 0
    }
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        updateCircleParams: (state, action: PayloadAction<CircleProps>) => {
            state.circle = action.payload
        },
        updateEllipseParams: (state, action: PayloadAction<EllipseProps>) => {
            state.ellipse = action.payload
        },
        updateHyperbolaParams: (state, action: PayloadAction<HyperbolaProps>) => {
            state.hyperbola = action.payload
        },
        updateParabolaParams: (state, action: PayloadAction<ParabolaProps>) => {
            state.parabola = action.payload
        }
    }
})

export default appSlice.reducer

export const useGetCircleParams = () => useSelector((state: StoreState) => state.appSlice.circle)

export const useGetEllipseParams = () => useSelector((state: StoreState) => state.appSlice.ellipse)

export const useGetHyperbolaParams = () => useSelector((state: StoreState) => state.appSlice.hyperbola)

export const useGetParabolaParams = () => useSelector((state: StoreState) => state.appSlice.parabola)

export const {updateCircleParams, updateHyperbolaParams, updateParabolaParams, updateEllipseParams} = appSlice.actions