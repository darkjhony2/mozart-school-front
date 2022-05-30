import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import StudentList from './studentList';

const Students = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="8">
                    <StudentList />
                </Col>
            </Row>
        </Container>
    )
}

Students.propTypes = {}

export default Students