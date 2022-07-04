import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';

const Grades = (props) => {

    const [reloadTable, setReloadTable] = useState(false);

    return (
        <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
            <Row>
                <Col sm="4">
                    
                </Col>
                <Col sm="6">

                </Col>
            </Row>
        </Container>
    )
}

export default Grades