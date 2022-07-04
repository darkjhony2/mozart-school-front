import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import EvaluationTypeList from './evaluationTypeList';
import SaveEvaluationType from './saveEvaluationType';

const EvaluationTypes = props => {
    const [reloadTable, setReloadTable] = useState(false);
    const [evaluationType, setEvaluationType] = useState(null);

    return (
        <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
            <Row>
                <Col sm="4">
                    <EvaluationTypeList setReloadTable={setReloadTable} reloadTable={reloadTable} setEvaluationTypes = { setEvaluationType } />
                </Col>
                <Col sm="4">
                    <SaveEvaluationType setReloadTable = { setReloadTable } evaluationType = { evaluationType } />
                </Col>
            </Row>
        </Container>
    )
}

export default EvaluationTypes