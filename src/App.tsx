import Canvas from "./components/Canvas"
import styles from "./components/style.module.css"
import Menu, {MenuListType} from "./components/Menu"
import {useState} from "react"

const App = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<MenuListType>("IDA") // По умолчанию выбран ИДА

    const selectAlgorithm = (algorithm: MenuListType) => {
        setSelectedAlgorithm(algorithm)
    }

    return <div className={styles.mainWrapper}>
        <Menu selectedAlgorithm={selectedAlgorithm} onSelectAlgorithm={selectAlgorithm}/>
        <Canvas selectedAlgorithm={selectedAlgorithm} />
    </div>
}

export default App