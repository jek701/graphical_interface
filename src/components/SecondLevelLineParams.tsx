import React from "react"
import {Col, Form, Input, Row} from "antd"
import Button from "antd/lib/button"
import {MenuListType} from "./Menu"
import {CircleProps, EllipseProps, HyperbolaProps, ParabolaProps} from "../types/SecondLevelLineTypes"

interface SecondLevelLineParamsProps {
    selectedAlgorithm: MenuListType
    circleProps: CircleProps
    ellipseProps: EllipseProps
    hyperbolaProps: HyperbolaProps
    parabolaProps: ParabolaProps
}

const SecondLevelLineParams: React.FC<SecondLevelLineParamsProps> = ({
                                                                         selectedAlgorithm,
                                                                         circleProps,
                                                                         ellipseProps,
                                                                         hyperbolaProps,
                                                                         parabolaProps
                                                                     }) => {
    switch (selectedAlgorithm) {
        case "Circle":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(circleProps).map((key, index) => {
                        return <Col span={24 / Object.keys(circleProps).length} key={index}>
                            <Form.Item style={{margin: 0}} name={key}>
                                <Input type={"number"} placeholder={`${key} of ${selectedAlgorithm}`}/>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Ellipse":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(ellipseProps).map((key, index) => {
                        return <Col span={24 / Object.keys(ellipseProps).length} key={index}>
                            <Form.Item style={{margin: 0}} name={key}>
                                <Input type={"number"} placeholder={`${key} of ${selectedAlgorithm}`}/>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Hyperbola":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(hyperbolaProps).map((key, index) => {
                        return <Col span={24 / Object.keys(hyperbolaProps).length} key={index}>
                            <Form.Item style={{margin: 0}} name={key}>
                                <Input type={"number"} placeholder={`${key} of ${selectedAlgorithm}`}/>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Parabola":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(parabolaProps).map((key, index) => {
                        return <Col span={24 / Object.keys(parabolaProps).length} key={index}>
                            <Form.Item style={{margin: 0}} name={key}>
                                <Input type={"number"} placeholder={`${key} of ${selectedAlgorithm}`}/>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        default:
            return <></>
    }

}

export default SecondLevelLineParams