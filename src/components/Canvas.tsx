import React, {useEffect, useRef, useState} from "react"
import styles from "./style.module.css"
import {MenuListType} from "./Menu"
import {
    useGetBezierParams,
    useGetBSplineParams,
    useGetCircleParams,
    useGetEllipseParams,
    useGetHermiteParams,
    useGetHyperbolaParams,
    useGetParabolaParams
} from "../features/app/appSlice"
import SecondLevelLineParams from "./SecondLevelLineParams"
import Button from "antd/lib/button"
import CurveParams from "./CurveParams"
import {CircleProps, EllipseProps, HyperbolaProps, ParabolaProps} from "../types/SecondLevelLineTypes"
import {BezierCurveProps, BSplineProps, HermiteCurveProps} from "../types/CurveTypes"

interface CanvasProps {
    selectedAlgorithm: MenuListType
}

const Canvas: React.FC<CanvasProps> = ({selectedAlgorithm}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [drawing, setDrawing] = useState(false)
    const [startPoint, setStartPoint] = useState({x: 0, y: 0})
    const [endPoint, setEndPoint] = useState({x: 0, y: 0})
    // Second level line params
    const circleParams = useGetCircleParams()
    const ellipseParams = useGetEllipseParams()
    const parabolaParams = useGetParabolaParams()
    const hyperbolaParams = useGetHyperbolaParams()
    // Curve params
    const hermiteParams = useGetHermiteParams()
    const bezierParams = useGetBezierParams()
    const bSplineParams = useGetBSplineParams()

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d")
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    useEffect(() => {
        clearCanvas()
        if (selectedAlgorithm === "Circle" && circleParams) {
            const {centerX, centerY, radius} = circleParams
            drawCircle({
                centerX: centerX,
                centerY: centerY,
                radius: radius
            })
        } else if (selectedAlgorithm === "Ellipse" && ellipseParams) {
            const {centerX, centerY, radiusX, radiusY} = ellipseParams
            drawEllipse({
                centerX: centerX,
                centerY: centerY,
                radiusX: radiusX,
                radiusY: radiusY
            })
        } else if (selectedAlgorithm === "Hyperbola" && hyperbolaParams) {
            const {centerX, centerY, a, b} = hyperbolaParams
            drawHyperbola({
                centerX: centerX,
                centerY: centerY,
                a: a,
                b: b
            })
        } else if (selectedAlgorithm === "Parabola" && parabolaParams) {
            const {focusX, focusY, p} = parabolaParams
            drawParabola({
                focusX: focusX,
                focusY: focusY,
                p: p
            })
        } else if (selectedAlgorithm === "IDA") {
            // Используйте алгоритм ИДА для рисования отрезка
            drawLineIDA()
        } else if (selectedAlgorithm === "Bresenham") {
            // Используйте алгоритм Брезенхема для рисования отрезка
            drawLineBresenham()
        } else if (selectedAlgorithm === "Wu") {
            // Используйте алгоритм Ву для рисования отрезка
            drawLineWu()
        } else if (selectedAlgorithm === "Hermite" && hermiteParams) {
            drawHermiteCurve(hermiteParams)
        } else if (selectedAlgorithm === "Bezier" && bezierParams) {
            drawBezierCurve(bezierParams)
        } else if (selectedAlgorithm === "BSpline" && bSplineParams) {
            drawBSpline(bSplineParams)
        }
    }, [selectedAlgorithm, circleParams, ellipseParams, hyperbolaParams, parabolaParams, bezierParams, hermiteParams, bSplineParams])

    const toolbar = () => {
        if (selectedAlgorithm === "Circle" || selectedAlgorithm === "Ellipse" || selectedAlgorithm === "Hyperbola" || selectedAlgorithm === "Parabola") {
            return <SecondLevelLineParams circleProps={circleParams} ellipseProps={ellipseParams}
                                          hyperbolaProps={hyperbolaParams} parabolaProps={parabolaParams}
                                          selectedAlgorithm={selectedAlgorithm}/>
        } else if (selectedAlgorithm === "Hermite" || selectedAlgorithm === "Bezier" || selectedAlgorithm === "BSpline") {
            return <CurveParams bezierProps={bezierParams} bSplineProps={bSplineParams} hermiteProps={hermiteParams}
                                selectedAlgorithm={selectedAlgorithm}/>
        } else {
            return <></>
        }
    }

    const drawPixel = (x: number, y: number) => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d")

            if (ctx) {
                ctx.fillStyle = "black" // Цвет пикселя
                ctx.fillRect(x, y, 1, 1) // Рисование пикселя
            }
        }
    }


    const drawLineIDA = () => {
        const dx = endPoint.x - startPoint.x
        const dy = endPoint.y - startPoint.y
        const steps = Math.max(Math.abs(dx), Math.abs(dy))

        const xIncrement = dx / steps
        const yIncrement = dy / steps

        let x = startPoint.x
        let y = startPoint.y

        for (let i = 0; i <= steps; i++) {
            drawPixel(x, y) // Реализуйте функцию рисования пикселя на холсте
            x += xIncrement
            y += yIncrement
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        // Обработка события клика по холсту для начала рисования
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            setStartPoint({x, y})
            setEndPoint({x, y})
            setDrawing(true)
        }
    }

    const handleMouseUp = () => {
        // Обработка события отпускания кнопки мыши
        if (drawing) {
            setDrawing(false)
            drawLineIDA() // Рисуем отрезок с помощью алгоритма ИДА
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        // Обработка движения мыши при рисовании
        if (drawing && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            setEndPoint({x, y})
        }
    }

    const drawLineBresenham = () => {
        let x1 = startPoint.x
        let y1 = startPoint.y
        let x2 = endPoint.x
        let y2 = endPoint.y

        const dx = Math.abs(x2 - x1)
        const dy = Math.abs(y2 - y1)
        const sx = x1 < x2 ? 1 : -1
        const sy = y1 < y2 ? 1 : -1

        let err = dx - dy
        let x = x1
        let y = y1

        while (true) {
            drawPixel(x, y) // Рисование пикселя

            if (x === x2 && y === y2) {
                break
            }

            const e2 = 2 * err
            if (e2 > -dy) {
                err -= dy
                x += sx
            }
            if (e2 < dx) {
                err += dx
                y += sy
            }
        }
    }

    const drawLineWu = () => {
        let x1 = startPoint.x
        let y1 = startPoint.y
        let x2 = endPoint.x
        let y2 = endPoint.y

        const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1)
        if (steep) {
            [x1, y1] = [y1, x1];
            [x2, y2] = [y2, x2]
        }
        if (x1 > x2) {
            [x1, x2] = [x2, x1];
            [y1, y2] = [y2, y1]
        }

        const dx = x2 - x1
        const dy = y2 - y1
        const gradient = dy / dx

        let xend = Math.round(x1)
        let yend = y1 + gradient * (xend - x1)
        const xpxl1 = xend
        const ypxl1 = Math.floor(yend)

        if (steep) {
            drawPixel(ypxl1, xpxl1)
            drawPixel(ypxl1 + 1, xpxl1)
        } else {
            drawPixel(xpxl1, ypxl1)
            drawPixel(xpxl1, ypxl1 + 1)
        }

        let intery = yend + gradient

        xend = Math.round(x2)
        yend = y2 + gradient * (xend - x2)
        const xpxl2 = xend
        const ypxl2 = Math.floor(yend)

        if (steep) {
            drawPixel(ypxl2, xpxl2)
            drawPixel(ypxl2 + 1, xpxl2)
        } else {
            drawPixel(xpxl2, ypxl2)
            drawPixel(xpxl2, ypxl2 + 1)
        }

        if (steep) {
            for (let x = xpxl1 + 1; x < xpxl2; x++) {
                drawPixel(Math.floor(intery), x)
                drawPixel(Math.floor(intery) + 1, x)
                intery += gradient
            }
        } else {
            for (let x = xpxl1 + 1; x < xpxl2; x++) {
                drawPixel(x, Math.floor(intery))
                drawPixel(x, Math.floor(intery) + 1)
                intery += gradient
            }
        }
    }

    // 2nd part - Line 2nd level

    const drawCircle = ({centerX, centerY, radius}: CircleProps) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if (ctx) {
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
            ctx.stroke()
        }
    }

    const drawEllipse = ({centerX, centerY, radiusX, radiusY}: EllipseProps) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if (ctx) {
            ctx.beginPath()
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
            ctx.stroke()
        }
    }

    const drawHyperbola = ({centerX, centerY, a, b}: HyperbolaProps) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if (ctx) {
            ctx.beginPath()

            for (let x = centerX - a; x <= centerX + a; x++) {
                const yPositive = Math.sqrt((x - centerX) ** 2 * (b ** 2) / (a ** 2) - (centerX ** 2))
                const yNegative = -yPositive
                ctx.lineTo(x, centerY + yPositive)
                ctx.lineTo(x, centerY + yNegative)
            }

            ctx.stroke()
        }
    }

    const drawParabola = ({focusX, focusY, p}: ParabolaProps) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if (ctx) {
            ctx.beginPath()

            for (let x = focusX - p; x <= focusX + p; x++) {
                const y = (x - focusX) ** 2 / (4 * p) + focusY
                ctx.lineTo(x, y)
            }

            ctx.stroke()
        }
    }

    // 3rd part - Эрмит, форма Безье, B-сплайн

    // Эрмитова кривая
    const drawHermiteCurve = ({
                                  p0_x,
                                  p0_y,
                                  p1_x,
                                  p1_y,
                                  r0_x,
                                  r0_y,
                                  r1_x,
                                  r1_y
                              }: HermiteCurveProps) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (ctx) {
            ctx.beginPath();

            for (let t = 0; t <= 1; t += 0.01) {
                const x = (2 * t**3 - 3 * t**2 + 1) * p0_x + (t**3 - 2 * t**2 + t) * r0_x + (-2 * t**3 + 3 * t**2) * p1_x + (t**3 - t**2) * r1_x;
                const y = (2 * t**3 - 3 * t**2 + 1) * p0_y + (t**3 - 2 * t**2 + t) * r0_y + (-2 * t**3 + 3 * t**2) * p1_y + (t**3 - t**2) * r1_y;

                ctx.lineTo(x, y);
            }

            ctx.stroke();
        }
    }

    // Безье кривая
    const drawBezierCurve = ({
                                 p0_x,
                                 p0_y,
                                 p1_x,
                                 p1_y,
                                 p2_x,
                                 p2_y,
                                 p3_x,
                                 p3_y
                             }: BezierCurveProps) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (ctx) {
            ctx.beginPath();

            for (let t = 0; t <= 1; t += 0.01) {
                const mt = 1 - t;
                const mt2 = mt * mt;
                const mt3 = mt2 * mt;

                const x = mt3 * p0_x + 3 * mt2 * t * p1_x + 3 * mt * t**2 * p2_x + t**3 * p3_x;
                const y = mt3 * p0_y + 3 * mt2 * t * p1_y + 3 * mt * t**2 * p2_y + t**3 * p3_y;

                ctx.lineTo(x, y);
            }

            ctx.stroke();
        }
    }

    // B-сплайн
    const drawBSpline = ({
                             p0_x,
                             p0_y,
                             p1_x,
                             p1_y,
                             p2_x,
                             p2_y,
                             p3_x,
                             p3_y
                         }: BSplineProps) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (ctx) {
            ctx.beginPath();

            for (let i = 0; i <= 1; i += 0.01) {
                const t = i * 0.33;
                const a = -0.5 * t**3 + t**2 - 0.5 * t;
                const b = 1.5 * t**3 - 2.5 * t**2 + 1;
                const c = -1.5 * t**3 + 2 * t**2 + 0.5 * t;
                const d = 0.5 * t**3 - 0.5 * t**2;

                const x = a * p0_x + b * p1_x + c * p2_x + d * p3_x;
                const y = a * p0_y + b * p1_y + c * p2_y + d * p3_y;

                ctx.lineTo(x, y);
            }

            ctx.stroke();
        }
    }

    return (
        <div className={styles.canvasWrapper}>
            <canvas
                className={styles.canvas}
                ref={canvasRef}
                width={700}
                height={700}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
            {toolbar()}
            <Button block type={"dashed"} onClick={clearCanvas}>Clear</Button>
        </div>
    )
}

export default Canvas
