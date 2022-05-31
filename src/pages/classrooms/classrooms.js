import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import ClassroomList from './classroomList';
import SaveClassroom from './saveClassroom';

const Classrooms = props => {
    const [reloadTable, setReloadTable] = useState(false);

    return (
        <Container fluid className='p-4'>
            <Row>
                <Col sm="6">
                    <ClassroomList reloadTable = { reloadTable } setReloadTable = { setReloadTable } />
                </Col>
                <Col sm="6">
                    <SaveClassroom setReloadTable = { setReloadTable } />
                </Col>
            </Row>
        </Container>
    )
}

Classrooms.propTypes = {}

export default Classrooms