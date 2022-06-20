import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';

const AcademicPeriods = props => {
    const [reloadTable, setReloadTable] = useState(false);
    const [academicPeriod, setAcademicPeriod] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="8">
                    <TeacherList setReloadTable={setReloadTable} reloadTable={reloadTable} setTeacher = { setAcademicPeriod } />
                </Col>
                <Col sm="4">
                    <SaveTeacher setReloadTable = { setReloadTable } teacher = { academicPeriod } />
                </Col>
            </Row>
        </Container>
    )
}

export default AcademicPeriods