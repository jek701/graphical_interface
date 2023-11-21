import React from "react"
import {Col, Form, Input, Row} from "antd"
import Button from "antd/lib/button"
import {MenuListType} from "./Menu"
import {BezierCurveProps, BSplineProps, HermiteCurveProps} from "../types/CurveTypes"

interface SecondLevelLineParamsProps {
    selectedAlgorithm: MenuListType
    hermiteProps: HermiteCurveProps
    bezierProps: BezierCurveProps
    bSplineProps: BSplineProps
}

const SecondLevelLineParams: React.FC<SecondLevelLineParamsProps> = ({
                                                                         selectedAlgorithm,
                                                                         hermiteProps,
                                                                         bezierProps,
                                                                         bSplineProps
                                                                     }) => {
    switch (selectedAlgorithm) {
        case "Hermite":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(hermiteProps).map((key, index) => {
                        return <Col span={24 / Object.keys(hermiteProps).length} key={index}>
                            <Form.Item style={{margin: 0}} name={key}>
                                <Input type={"number"} placeholder={`${key} of ${selectedAlgorithm}`}/>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "Bezier":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(bezierProps).map((key, index) => {
                        return <Col span={24 / Object.keys(bezierProps).length} key={index}>
                            <Form.Item style={{margin: 0}} name={key}>
                                <Input type={"number"} placeholder={`${key} of ${selectedAlgorithm}`}/>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Button htmlType={"submit"} type={"primary"} block>Применить изменения</Button>
            </>
        case "BSpline":
            return <>
                <Row gutter={[10, 0]}>
                    {Object.keys(bSplineProps).map((key, index) => {
                        return <Col span={24 / Object.keys(bSplineProps).length} key={index}>
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