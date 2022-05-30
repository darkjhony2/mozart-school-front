import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'
import SubjectList from './subjectList'
import SaveSubject from './saveSubject'

const Subjects = props => {

  const [reloadTable, setReloadTable] = useState(false);
  const [subject, setSubject] = useState(null);
  const [idEdit, setIdEdit] = useState();
  const [name, setName] = useState("");
  
  return (
    <Container fluid className='p-4 bg-smoke' style={{height: window.innerHeight}}>
      <Row>
        <Col sm = "3">
          <SubjectList setReloadTable = { setReloadTable } reloadTable = { reloadTable }
           setSubject = { setSubject } setName = { setName } setIdEdit = { setIdEdit } />
        </Col>
        <Col sm = "3" style={{float: 'right'}}>
          <SaveSubject setReloadTable = { setReloadTable } subject = { subject }
           name = { name } setName = { setName } idEdit = { idEdit }  setIdEdit = { setIdEdit } />
        </Col>
      </Row>
    </Container>
  )
}

Subjects.propTypes = {}

export default Subjects