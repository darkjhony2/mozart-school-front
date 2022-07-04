import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import AttendanceList from './attendanceList';
const Attendances = (props) => {

    const [reloadTable, setReloadTable] = useState(false);

    return (
        <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
            <Row>
                <Col sm="4">
                    <AttendanceList />
                </Col>
                <Col sm="6">

                </Col>
            </Row>
        </Container>
    )
}

export default Attendances