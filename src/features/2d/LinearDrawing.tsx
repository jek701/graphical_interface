import Canvas from "../../components/Canvas"
import styles from "../../components/style.module.css"
import Menu, {MenuListType} from "../../components/Menu"
import {useState} from "react"
import {Form} from "antd"
import {
    updateBezierParams, updateBSplineParams,
    updateCircleParams,
    updateEllipseParams, updateHermiteParams,
    updateHyperbolaParams,
    updateParabolaParams
} from "../app/appSlice"
import {useDispatch} from "../../store"

const initialValues = {
    centerX: 350,
    centerY: 350,
    radius: 50,
    radiusX: 50,
    radiusY: 100,
    a: 50,
    b: 30,
    focusX: 200,
    focusY: 200,
    p: 50,
    p0_x: 50,
    p0_y: 300,
    p1_x: 150,
    p1_y: 50,
    p2_x: 350,
    p2_y: 350,
    p3_x: 500,
    p3_y: 100,
    r0_x: 50,
    r0_y: 0,
    r1_x: -50,
    r1_y: 0
}

const LinearDrawing = () => {
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
        } else if (selectedAlgorithm === "Hermite") {
            dispatch(updateHermiteParams({
                p0_x: values.p0_x,
                p0_y: values.p0_y,
                p1_x: values.p1_x,
                p1_y: values.p1_y,
                r0_x: values.r0_x,
                r0_y: values.r0_y,
                r1_x: values.r1_x,
                r1_y: values.r1_y
            }))
        } else if (selectedAlgorithm === "Bezier") {
            dispatch(updateBezierParams({
                p0_x: values.p0_x,
                p0_y: values.p0_y,
                p1_x: values.p1_x,
                p1_y: values.p1_y,
                p2_x: values.p2_x,
                p2_y: values.p2_y,
                p3_x: values.p3_x,
                p3_y: values.p3_y
            }))
        } else if (selectedAlgorithm === "BSpline") {
            dispatch(updateBSplineParams({
                p0_x: values.p0_x,
                p0_y: values.p0_y,
                p1_x: values.p1_x,
                p1_y: values.p1_y,
                p2_x: values.p2_x,
                p2_y: values.p2_y,
                p3_x: values.p3_x,
                p3_y: values.p3_y
            }))
        }
    }

    const selectAlgorithm = (algorithm: MenuListType) => {
        setSelectedAlgorithm(algorithm)
    }

    return <div className={styles.mainWrapper}>
        <Menu selectedAlgorithm={selectedAlgorithm} onSelectAlgorithm={selectAlgorithm}/>
        <Form initialValues={initialValues} onFinish={onFinishHandler} form={form}>
            <Canvas selectedAlgorithm={selectedAlgorithm} />
        </Form>
    </div>
}

export default LinearDrawing