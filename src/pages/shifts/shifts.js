import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import ShiftList from './shiftList';
import SaveShift from './saveShift';

const Shifts = props => {
    const [reloadTable, setReloadTable] = useState(false);
    const [shift, setShift] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="3">
                    <ShiftList reloadTable = { reloadTable } setReloadTable = { setReloadTable } setShift = { setShift }/>
                </Col>
                <Col sm="2">
                    <SaveShift shift={ shift } setShift= { setShift } setReloadTable = { setReloadTable }/>
                </Col>
            </Row>
        </Container>
    )
}

Shifts.propTypes = {}

export default Shifts