import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import ShiftList from './shiftList';

const Shifts = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="2">
                    <ShiftList reloadTable = { reloadTable } setReloadTable = { setReloadTable } />
                </Col>
            </Row>
        </Container>
    )
}

Shifts.propTypes = {}

export default Shifts