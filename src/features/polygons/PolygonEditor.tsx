import React, {useMemo, useRef, useState} from "react"
import {Layer, Line, Stage} from "react-konva"
import styles from "../../components/style.module.css"
import Button from "antd/lib/button"
import {Col, ColorPicker, ColorPickerProps, notification, Row, Space} from "antd"
import {Color} from "antd/es/color-picker"

const PolygonEditor: React.FC = () => {
    const stageRef = useRef<any>(null)
    const [points, setPoints] = useState<number[][]>([])
    const [colorRgb, setColorRgb] = useState<Color | string>("rgb(22, 119, 255)")
    const [formatRgb, setFormatRgb] = useState<ColorPickerProps["format"]>("rgb")

    const rgbString = useMemo(
        () => (typeof colorRgb === "string" ? colorRgb : colorRgb.toRgbString()),
        [colorRgb]
    )

    const handleStageClick = (e: any) => {
        const {x, y} = e.target.getPointerPosition()
        setPoints([...points, [x, y]])
    }

    const isConvex = (points: number[][]) => {
        const n = points.length
        if (n < 3) return false

        let isClockwise = false
        let isCounterClockwise = false

        for (let i = 0; i < n; i++) {
            const p1 = points[i]
            const p2 = points[(i + 1) % n]
            const p3 = points[(i + 2) % n]

            const crossProduct = (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0])

            if (crossProduct > 0) {
                isCounterClockwise = true
            } else if (crossProduct < 0) {
                isClockwise = true
            }

            if (isCounterClockwise && isClockwise) {
                return false // Не выпуклый
            }
        }

        return true // Выпуклый
    }

    const findNormals = (points: number[][]) => {
        const normals: number[][] = []

        for (let i = 0; i < points.length; i++) {
            const p1 = points[i]
            const p2 = points[(i + 1) % points.length]

            const dx = p2[0] - p1[0]
            const dy = p2[1] - p1[1]

            // Перпендикулярный вектор (внутренняя нормаль)
            const normal = [-dy, dx]

            normals.push(normal)
        }

        return normals
    }

    const grahamScan = (points: number[][]) => {
        const n = points.length
        if (n < 3) return points

        const sortedPoints = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])

        const hull = [sortedPoints[0], sortedPoints[1]]

        for (let i = 2; i < n; i++) {
            while (
                hull.length >= 2 &&
                ((hull[hull.length - 1][1] - hull[hull.length - 2][1]) * (sortedPoints[i][0] - hull[hull.length - 1][0]) -
                    (hull[hull.length - 1][0] - hull[hull.length - 2][0]) * (sortedPoints[i][1] - hull[hull.length - 1][1])) <= 0
                ) {
                hull.pop()
            }
            hull.push(sortedPoints[i])
        }

        return hull
    }

    const jarvisMarch = (points: number[][]) => {
        const n = points.length
        if (n < 3) return points

        const getNextPoint = (currentPoint: number[]) => {
            let nextPoint = points[0]
            for (let i = 1; i < n; i++) {
                if (
                    nextPoint === currentPoint ||
                    (points[i][1] < nextPoint[1] ||
                        (points[i][1] === nextPoint[1] && points[i][0] < nextPoint[0]))
                ) {
                    nextPoint = points[i]
                }
            }
            return nextPoint
        }

        let hull: number[][] = []
        let currentPoint = points[0]

        do {
            hull.push(currentPoint)
            const nextPoint = getNextPoint(currentPoint)
            currentPoint = nextPoint
        } while (currentPoint !== hull[0])

        return hull
    }

    const handleGrahamScanClick = () => {
        const convexHull = grahamScan(points)
        console.log("Convex Hull (Graham Scan):", convexHull)
    }

    const handleJarvisMarchClick = () => {
        const convexHull = jarvisMarch(points)
        console.log("Convex Hull (Jarvis March):", convexHull)
    }

    const handleCheckClick = () => {
        notification.info({
            message: "Итоги проверки полигона",
            description: <>
                <p>Выпуклость: {isConvex(points) ? "Да" : "Нет"}</p>
                <p>Нормали: {findNormals(points)}</p>
            </>,
            duration: 0
        })
        console.log("Is Convex:", isConvex(points))
        console.log("Normals:", findNormals(points))
    }

    return (
        <div className={styles.polygonContainer}>
            <Stage className={styles.polygonViewport} width={window.innerWidth * .7} height={window.innerHeight * .7}
                   onClick={handleStageClick} ref={stageRef}>
                <Layer>
                    <Line
                        points={points.flat()}
                        closed
                        stroke="black"
                        strokeWidth={1}
                        fill={rgbString}
                    />
                </Layer>
            </Stage>
            <Row align="middle">
                Закрасить полигон цветом: &nbsp;
                <Space>
                    <Col>
                        <ColorPicker
                            format={formatRgb}
                            value={colorRgb}
                            onChange={setColorRgb}
                            onFormatChange={setFormatRgb}
                        />
                    </Col>
                    <Col>
                        RGB: <span>{rgbString}</span>
                    </Col>
                </Space>
            </Row>
            <Row style={{width: "100%", justifyContent: "center"}} gutter={10}>
                <Col span={3}>
                    <Button block onClick={handleCheckClick}>Check Polygon</Button>
                </Col>
                <Col span={3}>
                    <Button block onClick={handleGrahamScanClick}>Graham Scan</Button>
                </Col>
                <Col span={3}>
                    <Button block>Jarvis March</Button>
                </Col>
            </Row>
        </div>
    )
}

export default PolygonEditor
