import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap';
import SectionsList from './sectionsList';

const Sections = props => {
    const [reloadTable, setReloadTable] = useState(false);
    //const [academicLevel, setAcademicLevel] = useState(null);

    return (
        <Container fluid className='p-4'>
            <Row>
                <Col sm="2">
                    <SectionsList reloadTable = { reloadTable } setReloadTable ={ setReloadTable } />
                </Col>
            </Row>
        </Container>
    )
}

Sections.propTypes = {}

export default Sections