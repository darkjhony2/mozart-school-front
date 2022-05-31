import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import SectionsList from './sectionsList';
import SaveSection from './saveSection';

const Sections = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
            <Row>
                <Col sm="2">
                    <SectionsList reloadTable = { reloadTable } setReloadTable ={ setReloadTable } />
                </Col>
                <Col sm="3">
                    <SaveSection setReloadTable = { setReloadTable } />
                </Col>
            </Row>
        </Container>
    )
}

Sections.propTypes = {}

export default Sections