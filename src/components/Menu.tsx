import React from "react"
import styles from "../components/style.module.css"
import cn from "classnames"

interface MenuProps {
    onSelectAlgorithm: (algorithm: string) => void
    selectedAlgorithm: string
}

const Menu: React.FC<MenuProps> = ({onSelectAlgorithm, selectedAlgorithm}) => {
    return (
        <div className={styles.menu}>
            <ul>
                <li className={cn({[styles.active]: selectedAlgorithm === "IDA"})} onClick={() => onSelectAlgorithm("IDA")}>ИДА</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Bresenham"})} onClick={() => onSelectAlgorithm("Bresenham")}>Брезенхем</li>
                <li className={cn({[styles.active]: selectedAlgorithm === "Wu"})} onClick={() => onSelectAlgorithm("Wu")}>Алгоритм Ву</li>
            </ul>
        </div>
    )
}

export default Menu
