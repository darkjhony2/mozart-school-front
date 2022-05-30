import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import AcademicLevelList from './academicLevelList';

const AcademicLevels = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="3">
                    <AcademicLevelList reloadTable = { reloadTable } setReloadTable = { setReloadTable } />
                </Col>
            </Row>
        </Container>
    )
}

AcademicLevels.propTypes = {}

export default AcademicLevels