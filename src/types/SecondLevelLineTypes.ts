// Second level line params
export interface CircleProps {
    centerX: number,
    centerY: number,
    radius: number
}

export interface EllipseProps {
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number
}

export interface HyperbolaProps {
    centerX: number
    centerY: number
    a: number
    b: number
}

export interface ParabolaProps {
    focusX: number
    focusY: number
    p: number
}