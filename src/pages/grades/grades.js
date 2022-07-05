import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import GradeEvaluationList from './gradeEvaluationList';
import GradeList from './gradeList';

const Grades = (props) => {

    const [reloadTable, setReloadTable] = useState(false);

    return (
        <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
            <Row>
                <Col sm="4">
                    <GradeList />
                </Col>
                <Col sm="6">
                    <GradeEvaluationList/>
                </Col>
            </Row>
        </Container>
    )
}

export default Grades