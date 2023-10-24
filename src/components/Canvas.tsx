import React, {useRef, useState} from "react"
import styles from "./style.module.css"

interface CanvasProps {
    selectedAlgorithm: string
}

const Canvas: React.FC<CanvasProps> = ({selectedAlgorithm}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [drawing, setDrawing] = useState(false)
    const [startPoint, setStartPoint] = useState({x: 0, y: 0})
    const [endPoint, setEndPoint] = useState({x: 0, y: 0})

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
