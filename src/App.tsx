import Canvas from "./components/Canvas"
import styles from "./components/style.module.css"
import Menu, {MenuListType} from "./components/Menu"
import {useState} from "react"
import {Form} from "antd"
import {useDispatch} from "./store"
import {
    updateCircleParams,
    updateEllipseParams,
    updateHyperbolaParams,
    updateParabolaParams
} from "./features/app/appSlice"

const App = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<MenuListType>("IDA") // По умолчанию выбран ИДА

    const onFinishHandler = (values: any) => {
        if (selectedAlgorithm === "Circle") {
            dispatch(updateCircleParams({
                centerX: values.centerX,
                centerY: values.centerY,
                radius: values.radius
            }))
        } else if (selectedAlgorithm === "Ellipse") {
            dispatch(updateEllipseParams({
                centerX: values.centerX,
                centerY: values.centerY,
                radiusX: values.radiusX,
                radiusY: values.radiusY,
            }))
        } else if (selectedAlgorithm === "Hyperbola") {
            dispatch(updateHyperbolaParams({
                centerX: values.centerX,
                centerY: values.centerY,
                a: values.a,
                b: values.b,
            }))
        } else if (selectedAlgorithm === "Parabola") {
            dispatch(updateParabolaParams({
                focusX: values.focusX,
                focusY: values.focusY,
                p: values.p
            }))
        }
    }

    const selectAlgorithm = (algorithm: MenuListType) => {
        setSelectedAlgorithm(algorithm)
    }

    return <div className={styles.mainWrapper}>
        <Menu selectedAlgorithm={selectedAlgorithm} onSelectAlgorithm={selectAlgorithm}/>
        <Form initialValues={{
            centerX: 350,
            centerY: 350,
            radius: 50,
            radiusX: 50,
            radiusY: 100,
            a: 50,
            b: 30,
            focusX: 200,
            focusY: 200,
            p: 50
        }} onFinish={onFinishHandler} form={form}>
            <Canvas selectedAlgorithm={selectedAlgorithm} />
        </Form>
    </div>
}

export default App