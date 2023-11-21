// Curve props
export interface HermiteCurveProps {
    p0_x: number
    p0_y: number
    p1_x: number
    p1_y: number
    r0_x: number
    r0_y: number
    r1_x: number
    r1_y: number
}

export interface BezierCurveProps {
    p0_x: number
    p0_y: number
    p1_x: number
    p1_y: number
    p2_x: number
    p2_y: number
    p3_x: number
    p3_y: number
}

export interface BSplineProps extends BezierCurveProps {
}