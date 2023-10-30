import React from "react"
import {Col, Form, Input, Row} from "antd"
import Button from "antd/lib/button"
import {MenuListType} from "./Menu"

interface SecondLevelLineParamsProps {
    selectedAlgorithm: MenuListType
}

const SecondLevelLineParams: React.FC<SecondLevelLineParamsProps> = ({selectedAlgorithm}) => {
    switch (selectedAlgorithm) {
        case "Circle":
            return <>
                <Row gutter={[10, 0]}>
                    <Col span={8}>
                        <Form.Item style={{margin: 0}} name={"centerX"}>
                            <Input type={"number"} placeholder={`Center from X of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{margin: 0}} name={"centerY"}>
                            <Input type={"number"} placeholder={`Center from Y of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{margin: 0}} name={"radius"}>
                            <Input type={"number"} placeholder={`Radius of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Ellipse":
            return <>
                <Row gutter={[10, 0]}>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"centerX"}>
                            <Input type={"number"} placeholder={`Center from X of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"centerY"}>
                            <Input type={"number"} placeholder={`Center from Y of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"radiusX"}>
                            <Input type={"number"} placeholder={`RadiusX of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"radiusY"}>
                            <Input type={"number"} placeholder={`RadiusY of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Hyperbola":
            return <>
                <Row gutter={[10, 0]}>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"centerX"}>
                            <Input type={"number"} placeholder={`Center from X of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"centerY"}>
                            <Input type={"number"} placeholder={`Center from Y of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"a"}>
                            <Input type={"number"} placeholder={`b of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{margin: 0}} name={"b"}>
                            <Input type={"number"} placeholder={`a of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Parabola":
            return <>
                <Row gutter={[10, 0]}>
                    <Col span={8}>
                        <Form.Item style={{margin: 0}} name={"focusX"}>
                            <Input type={"number"} placeholder={`FocusX of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{margin: 0}} name={"focusY"}>
                            <Input type={"number"} placeholder={`FocusY of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{margin: 0}} name={"p"}>
                            <Input type={"number"} placeholder={`P of ${selectedAlgorithm}`} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        default:
            return <></>
    }

}

export default SecondLevelLineParams