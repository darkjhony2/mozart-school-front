import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import StudentList from './studentList';
import SaveStudent from './saveStudent';

const Students = props => {
    const [reloadTable, setReloadTable] = useState(false);
    const [student, setStudent] = useState(undefined);
    
    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="2">
                    <StudentList reloadTable= {reloadTable} setReloadTable = { setReloadTable } setStudent = {setStudent}/>
                </Col>
                <Col sm="2">
                    <SaveStudent student={ student } setStudent = {setStudent} setReloadTable = { setReloadTable }/>
                </Col>                
            </Row>
        </Container>
    )
}

Students.propTypes = {}

export default Students