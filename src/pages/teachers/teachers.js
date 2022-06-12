import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TeacherList from './teacherList';
import { Col, Container, Row } from 'reactstrap';
import SaveTeacher from './saveTeacher';

const Teachers = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="8">
                    <TeacherList />
                </Col>
                <Col sm="4">
                    <SaveTeacher />
                </Col>
            </Row>
        </Container>
    )
}

Teachers.propTypes = {}

export default Teachers