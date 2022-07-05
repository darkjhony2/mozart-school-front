import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Input, Label, Row } from 'reactstrap'

const CustomInput = props => {

    const [grade, setGrade] = useState("");

    function handleSetGrade() {
        let studentGrade = {};
        let isFound = false;
        studentGrade.score = grade;
        studentGrade.studentId = props.id;
        if (props.grades.length > 0) {
            props.grades.forEach(g => {
                if (g.studentId == studentGrade.studentId) {
                    isFound = true;
                }
            })
            if (!isFound) {
                props.setGrades([...props.grades, studentGrade]);
            } else {
                props.grades.forEach(g => {
                    if (g.studentId == studentGrade.studentId) {
                        g.score = studentGrade.score;
                    }
                })
            }
        } else {
            props.setGrades([...props.grades, studentGrade]);
        }
    }

    return (
        <Row>
            <Col sm="6">
                <Input disabled={props.evaluation == null || props.evaluation == "[Seleccione]" ? true: false} id={props.id} size='sm' value={grade} onChange={e => setGrade(e.target.value)} onBlur={e => handleSetGrade()} />
            </Col>
        </Row>
    )
}

CustomInput.propTypes = {}

export default CustomInput