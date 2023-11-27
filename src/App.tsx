import {Tabs} from "antd"
import LinearDrawing from "./features/2d/LinearDrawing"
import VolumetricDrawing from "./features/3d/VolumetricDrawing"
import PolygonEditor from "./features/polygons/PolygonEditor"

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
    },
    {
        label: "Полигоны",
        key: "polygons",
        children: <PolygonEditor />
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