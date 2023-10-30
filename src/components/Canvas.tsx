import React, {useEffect, useRef, useState} from "react"
import styles from "./style.module.css"
import {MenuListType} from "./Menu"
import {
    useGetCircleParams,
    useGetEllipseParams,
    useGetHyperbolaParams,
    useGetParabolaParams
} from "../features/app/appSlice"

interface CanvasProps {
    selectedAlgorithm: MenuListType
}

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

const Canvas: React.FC<CanvasProps> = ({selectedAlgorithm}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [drawing, setDrawing] = useState(false)
    const [startPoint, setStartPoint] = useState({x: 0, y: 0})
    const [endPoint, setEndPoint] = useState({x: 0, y: 0})
    // Getting params from store
    const circleParams = useGetCircleParams()
    const ellipseParams = useGetEllipseParams()
    const parabolaParams = useGetParabolaParams()
    const hyperbolaParams = useGetHyperbolaParams()

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d")
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    const drawLine = () => {
        if (selectedAlgorithm === "IDA") {
            // Используйте алгоритм ИДА для рисования отрезка
            drawLineIDA()
        } else if (selectedAlgorithm === "Bresenham") {
            // Используйте алгоритм Брезенхема для рисования отрезка
            drawLineBresenham()
        } else if (selectedAlgorithm === "Wu") {
            // Используйте алгоритм Ву для рисования отрезка
            drawLineWu()
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
        }
    }, [selectedAlgorithm])

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
        let xgap = 1 - (x1 + 0.5) % 1
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
        xgap = (x2 + 0.5) % 1
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


    return (
        <div className={styles.canvasWrapper}>
            <canvas
                className={styles.canvas}
                ref={canvasRef}
                width={600}
                height={400}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
            <button onClick={clearCanvas}>Clear</button>
        </div>
    )
}

export default Canvas
