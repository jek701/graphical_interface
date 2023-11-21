import React, {useEffect, useRef, useState} from "react"
import styles from "../../components/style.module.css"
import * as THREE from "three"
import {Col, Form, Row, Space} from "antd"
import Button from "antd/lib/button"
import {InputNumber} from "antd/lib"
import Title from "antd/es/typography/Title"

interface VolumetricDrawingProps {

}

const VolumetricDrawing: React.FC<VolumetricDrawingProps> = ({}) => {
    const [width, setWidth] = useState(2)
    const [height, setHeight] = useState(2)
    const [depth, setDepth] = useState(2)
    const [cameraZoom, setCameraZoom] = useState(75)
    const ref = useRef<HTMLDivElement>(null)
    const scene = new THREE.Scene()

    const onFormFinish = (values: {
        width: number,
        height: number,
        depth: number,
        cameraZoom: number
    }) => {
        setWidth(values.width)
        setHeight(values.height)
        setDepth(values.depth)
        setCameraZoom(values.cameraZoom)
    }

    const renderer = new THREE.WebGLRenderer({alpha: true})
    renderer.setSize(window.innerWidth * .7, window.innerHeight * .7)
    const camera = new THREE.PerspectiveCamera(cameraZoom, window.innerWidth / window.innerHeight, 1, 100)
    camera.position.z = 5

    useEffect(() => {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshBasicMaterial({color: 0xa9a9a9})
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        if (ref.current) {
            ref.current.innerHTML = ""
            ref.current.appendChild(renderer.domElement)
        }
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        })

        const cubeCamera = new THREE.CubeCamera(10, 1000, cubeRenderTarget)
        scene.add(cubeCamera)

        const wireframeGeometry = new THREE.WireframeGeometry(geometry)
        const wireframeMaterial = new THREE.LineBasicMaterial({color: 0xffffff})
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
        cube.add(wireframe)

        if (ref.current) {
            let isMouseDown = false
            window.addEventListener("mousedown", () => {
                isMouseDown = true
            })
            window.addEventListener("mouseup", () => {
                isMouseDown = false
            })

            window.addEventListener("mousemove", (e) => {
                if (isMouseDown) {
                    cube.rotation.x += e.movementY / 100
                    cube.rotation.y += e.movementX / 100
                    cubeCamera.update(renderer, scene)
                    renderer.render(scene, camera)
                }
            })
        }
        cubeCamera.update(renderer, scene)
        renderer.render(scene, camera)
    }, [width, height, depth, ref, cameraZoom])

    return (
        <div className={styles.threeDContainer}>
            <div className={styles.threeDViewport} ref={ref}/>
            <Form
                onFinish={onFormFinish}
                initialValues={{
                    width: 2,
                    height: 2,
                    depth: 2,
                    cameraZoom: 75
                }}
            >
                <Space direction={"vertical"} align={"center"}>
                    <Title level={4}>Параметры фигуры</Title>
                    <Row gutter={[10, 10]}>
                        <Col>
                            <Form.Item label={"Ширина куба (x)"} name={"width"}>
                                <InputNumber min={1} placeholder={"Введите ширину куба"}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label={"Высота куба (y)"} name={"height"}>
                                <InputNumber min={1} placeholder={"Введите длину куба"}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label={"Глубина куба (z)"} name={"depth"}>
                                <InputNumber min={1} placeholder={"Введите глубину куба"}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label={"Зум камеры (больше - дальше)"} name={"cameraZoom"}>
                                <InputNumber min={1} placeholder={"Введите зум камеры"}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button htmlType={"submit"} type={"primary"}>Применить</Button>
                </Space>
            </Form>
        </div>
    )
}

export default VolumetricDrawing