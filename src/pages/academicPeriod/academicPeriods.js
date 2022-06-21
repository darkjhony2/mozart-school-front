import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import AcademicPeriodList from './academicPeriodList';
import SaveAcademicPeriod from './saveAcademicPeriod';

const AcademicPeriods = props => {
    const [reloadTable, setReloadTable] = useState(false);
    const [academicPeriod, setAcademicPeriod] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="4">
                    <AcademicPeriodList setReloadTable={setReloadTable} reloadTable={reloadTable} setAcademicPeriod = { setAcademicPeriod }  />
                </Col>
                <Col sm="3">
                    <SaveAcademicPeriod academicPeriod = { academicPeriod } setReloadTable={setReloadTable} />
                </Col>
            </Row>
        </Container>
    )
}

export default AcademicPeriods