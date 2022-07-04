import React, { useEffect, useState } from 'react'
import * as apiEvaluationTypes from '../../api/apiEvaluationType';
import { Button, Card, Col, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Search from '../../components/generals/search';

const EvaluationTypeList = props => {
  const [evaluationTypes, setEvaluationTypes] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    fillEvaluationTypes();
  }, [])

  useEffect(() => {
    if (props.reloadTable) {
      fillEvaluationTypes();
      props.setReloadTable(false);
    }
  }, [props.reloadTable])

  async function fillEvaluationTypes() {
    var resp = await apiEvaluationTypes.list();
    setEvaluationTypes(resp);
  }

  async function deleteEvaluationType(id) {
    var resp = await apiEvaluationTypes.deleteEvaluationType(id);
    console.log(resp)
    if (resp.response != undefined) {
      if (resp.response.status != 200) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: resp.response.data.detail,
        });
        return;
      }
    }
    MySwal.fire({
      icon: 'success',
      title: 'Ok',
      text: "Se guardo Correctamente"
    });
    props.setReloadTable(true);
  }

  return (
    <Card body>
      <h5>Tipos de Evaluaciones</h5>
      <hr />
      <Row>
        <Col sm="6">
          <Search columnSearch={0} target={'table'} id={'search'} placeholder={'Buscar por Nombre'} />
        </Col>
      </Row>
      <br />
      <Table id = { 'table' } size='sm' hover bordered className='bg-forms' responsive>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            evaluationTypes.map((et, idx) => {
              return (
                <tr key={idx} className="pointer" >
                  <td>{et.name}</td>
                  <td style={{textAlign: 'center'}}><Button size='sm' onClick={e => deleteEvaluationType(et.id)}>Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Card>
  )
}

EvaluationTypeList.propTypes = {}

export default EvaluationTypeList