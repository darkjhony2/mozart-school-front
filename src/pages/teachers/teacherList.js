import React, { useEffect, useState } from 'react'
import * as apiTeacher from '../../api/apiTeacher';
import { Button, Card, Col, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Search from '../../components/generals/search';

const TeacherList = props => {
  const [teachers, setTeachers] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    fillTeachers();
  }, [])

  useEffect(() => {
    if (props.reloadTable) {
      fillTeachers();
      props.setReloadTable(false);
    }
  }, [props.reloadTable])

  async function fillTeachers() {
    var resp = await apiTeacher.list();
    setTeachers(resp);
  }

  async function deleteTeacher(id) {
    var resp = await apiTeacher.deleteTeacher(id);
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
      <h5>Docentes</h5>
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
            <th>Nombres y Apellidos</th>
            <th>Tipo de Documento</th>
            <th>Numero de Documento</th>
            <th>Teléfono</th>
            <th>Edad</th>
            <th>Genero</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers.map((teacher, idx) => {
              return (
                <tr key={idx} className="pointer">
                  <td>{teacher.name} {teacher.lastName} {teacher.mothersLastName}</td>
                  <td>{teacher.documentType}</td>
                  <td>{teacher.documentNumber}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.age}</td>
                  <td>{teacher.gender}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Card>
  )
}

TeacherList.propTypes = {}

export default TeacherList