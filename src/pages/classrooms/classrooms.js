import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';

const Classrooms = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4'>
            <Row>
                <Col sm="2">
                    
                </Col>
            </Row>
        </Container>
    )
}

Classrooms.propTypes = {}

export default Classrooms