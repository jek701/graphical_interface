import {Tabs} from "antd"
import LinearDrawing from "./features/2d/LinearDrawing"
import VolumetricDrawing from "./features/3d/VolumetricDrawing"

const tabs = [
    {
        label: "2D алгоритмы",
        key: "2d",
        children: <LinearDrawing />
    },
    {
        label: "3D алгоритмы",
        key: "3d",
        children: <VolumetricDrawing />
    }
]

const App = () => {
    return (
        <Tabs
            defaultActiveKey="1"
            centered
            items={tabs}
        />
    )
}

export default App