import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Label, Row, Table } from 'reactstrap'
import * as apiEvaluations from '../../api/apiEvaluation'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Search from '../../components/generals/search'


const EvaluationList = (props) => {

  const [evaluations, setEvaluations] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    if(localStorage.getItem('role') != 'Administrator')
    fillEvaluations();
  }, [])
  
  useEffect(() => {
    if(props.reloadTable){
      fillEvaluations();
      props.setReloadTable(false);
    }
  }, [props.reloadTable])

  async function fillEvaluations() {
    var resp = await apiEvaluations.list();
    setEvaluations(resp);
  }

  return (
    <Card body>
        <h5>Evaluaciones</h5>
        <hr/>
        <Row>
          <Col sm="6">
            <Search columnSearch = { 0 } target = { 'table' } id = { 'search' } placeholder={'Buscar por Nombre'} />
          </Col>
        </Row>
        <br/>
        <Table id='table' size='sm' hover bordered className='bg-forms' responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Materia</th>
                    <th>Período</th>
                    <th>Salón</th>
                    <th>Peso</th>
                    <th>Fecha</th>
                    <th>Punt. Máx.</th>
                </tr>
            </thead>
            <tbody>
                {
                  evaluations.map((ev, idx) => {
                    return(
                      <tr key = { idx } className="pointer">
                        <td>{ev.evaluationName}</td>
                        <td>{ev.evaluationType.name}</td>
                        <td>{ev.subject.name}</td>
                        <td>{ev.academicPeriod.name}</td>
                        <td>{ev.classRoom.level.level} {ev.classRoom.section.name} {ev.classRoom.shift.name}</td>
                        <td>{ev.weight}</td>
                        <td>{ev.evaluationDate.replace("T", " ")}</td>
                        <td>{ev.maximumScore}</td>
                      </tr>
                    )
                  })
                }
            </tbody>
        </Table>
    </Card>
  )
}

export default EvaluationList