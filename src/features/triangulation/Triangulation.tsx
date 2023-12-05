// DelaunayVoronoiComponent.tsx
import React, {useEffect, useRef, useState} from "react"
import * as d3 from "d3-delaunay"
import {select} from "d3-selection"
import styles from "../../components/style.module.css"
import Button from "antd/lib/button"
import {InputNumber} from "antd"

interface DelaunayVoronoiProps {
}

const DelaunayVoronoiComponent: React.FC<DelaunayVoronoiProps> = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    const [points, setPoints] = useState<[number, number][]>([])
    const [pointCount, setPointCount] = useState<number>(3)

    const onInputChangeHandler = (value: number | null) => {
        if (value) {
            setPointCount(Number(value))
        }
    }

    const generateRandomPoints = () => {
        setPoints([])
        const points: [number, number][] = []
        for (let i = 0; i < pointCount; i++) {
            points.push([Math.random() * 600, Math.random() * 400])
        }
        setPoints(points)
    }

    useEffect(() => {
        if (!svgRef.current) return
        svgRef.current.innerHTML = ""

        const width = svgRef.current.clientWidth
        const height = svgRef.current.clientHeight

        const delaunay = d3.Delaunay.from(points)
        const voronoi = delaunay.voronoi([0, 0, width, height])

        const svg = select(svgRef.current) // Use select from d3-selection

        // // Отрисовка триангуляции Делоне
        svg
            .selectAll("path.triangle")
            .data(delaunay.triangles)
            .enter()
            .append("path")
            .attr("class", "triangle")
            .attr("stroke", "black")
            .attr("fill", "none")

        // Отрисовка диаграммы Вороного
        svg
            .selectAll("path.cell")
            .data(voronoi.cellPolygons())
            .enter()
            .append("path")
            .attr("class", "cell")
            .attr("d", (d) => (d ? `M${d.join("L")}Z` : null))
            .attr("stroke", "black")
            .attr("fill", "none")
    }, [points])

    return <div className={styles.triangulationWrapper}>
        <svg ref={svgRef} width={600} height={400}></svg>
        <InputNumber style={{width: "225px"}} placeholder={"Укажите количество точек"} min={3} max={1000} controls={false} onChange={(value) => onInputChangeHandler(value)} />
        <Button onClick={() => generateRandomPoints()}>Генерировать другой паттерн</Button>
    </div>
}

export default DelaunayVoronoiComponent
