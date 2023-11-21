import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {BezierCurveProps, BSplineProps, HermiteCurveProps} from "../../types/CurveTypes"
import {CircleProps, EllipseProps, HyperbolaProps, ParabolaProps} from "../../types/SecondLevelLineTypes"
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
    hermite: HermiteCurveProps
    bezier: BezierCurveProps
    b_spline: BSplineProps
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
    },
    hermite: {
        p0_x: 0,
        p0_y: 0,
        p1_x: 0,
        p1_y: 0,
        r0_x: 0,
        r0_y: 0,
        r1_x: 0,
        r1_y: 0
    },
    bezier: {
        p0_x: 0,
        p0_y: 0,
        p1_x: 0,
        p1_y: 0,
        p2_x: 0,
        p2_y: 0,
        p3_x: 0,
        p3_y: 0
    },
    b_spline: {
        p0_x: 0,
        p0_y: 0,
        p1_x: 0,
        p1_y: 0,
        p2_x: 0,
        p2_y: 0,
        p3_x: 0,
        p3_y: 0
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
        },
        updateHermiteParams: (state, action: PayloadAction<HermiteCurveProps>) => {
            state.hermite = action.payload
        },
        updateBezierParams: (state, action: PayloadAction<BezierCurveProps>) => {
            state.bezier = action.payload
        },
        updateBSplineParams: (state, action: PayloadAction<BSplineProps>) => {
            state.b_spline = action.payload
        }
    }
})

export default appSlice.reducer

export const useGetCircleParams = () => useSelector((state: StoreState) => state.appSlice.circle)

export const useGetEllipseParams = () => useSelector((state: StoreState) => state.appSlice.ellipse)

export const useGetHyperbolaParams = () => useSelector((state: StoreState) => state.appSlice.hyperbola)

export const useGetParabolaParams = () => useSelector((state: StoreState) => state.appSlice.parabola)

export const useGetHermiteParams = () => useSelector((state: StoreState) => state.appSlice.hermite)

export const useGetBezierParams = () => useSelector((state: StoreState) => state.appSlice.bezier)

export const useGetBSplineParams = () => useSelector((state: StoreState) => state.appSlice.b_spline)

export const {
    updateCircleParams,
    updateHyperbolaParams,
    updateParabolaParams,
    updateEllipseParams,
    updateHermiteParams,
    updateBezierParams,
    updateBSplineParams
} = appSlice.actions