import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import EvaluationList from './evaluationList';
import SaveEvaluation from './saveEvaluation';

const Evaluations = (props) => {

  const [reloadTable, setReloadTable] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  return (
    <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
      <Row>
        <Col sm="9">
          <EvaluationList setEvaluation = { setEvaluation } setReloadTable = { setReloadTable } reloadTable = { reloadTable } />
        </Col>
        <Col sm="3" style={{ float: 'right' }}>
          <SaveEvaluation evaluation = { evaluation } setReloadTable = { setReloadTable } />
        </Col>
      </Row>
    </Container>
  )
}

export default Evaluations