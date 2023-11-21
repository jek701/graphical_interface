import React from "react"
import styles from "../components/style.module.css"
import cn from "classnames"

interface MenuProps {
    onSelectAlgorithm: (algorithm: MenuListType) => void
    selectedAlgorithm: string
}

export type MenuListType = "IDA" | "Bresenham" | "Wu" | "Circle" | "Ellipse" | "Hyperbola" | "Parabola" | "Hermite" | "Bezier" | "BSpline"

const Menu: React.FC<MenuProps> = ({onSelectAlgorithm, selectedAlgorithm}) => {
    return (
        <div className={styles.menu}>
            <ul>
                <li className={cn({[styles.active]: selectedAlgorithm === "IDA"})} onClick={() => onSelectAlgorithm("IDA")}>ИДА</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Bresenham"})} onClick={() => onSelectAlgorithm("Bresenham")}>Брезенхем</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Wu"})} onClick={() => onSelectAlgorithm("Wu")}>Алгоритм Ву</li>
            </ul>
            <p>Линии второго порядка</p>
            <ul>
                <li className={cn({[styles.active]: selectedAlgorithm === "Circle"})} onClick={() => onSelectAlgorithm("Circle")}>Окружность</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Ellipse"})} onClick={() => onSelectAlgorithm("Ellipse")}>Эллипс</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Hyperbola"})} onClick={() => onSelectAlgorithm("Hyperbola")}>Гипербола</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Parabola"})} onClick={() => onSelectAlgorithm("Parabola")}>Парабола</li>
            </ul>
            <p>Кривые</p>
            <ul>
                <li className={cn({[styles.active]: selectedAlgorithm === "Hermite"})} onClick={() => onSelectAlgorithm("Hermite")}>Эрмита</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Bezier"})} onClick={() => onSelectAlgorithm("Bezier")}>Безье</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "BSpline"})} onClick={() => onSelectAlgorithm("BSpline")}>B-сплайн</li>
            </ul>
        </div>
    )
}

export default Menu
