import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as apiStudent from '../../api/apiStudent'
import { Button, Card, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const StudentList = props => {
  const [students, setStudents] = useState([]);
  const MySwal = withReactContent(Swal)
  
    useEffect(() => {
      fillSections();
    }, [])
  
    useEffect(() => {
      if (props.reloadTable) {
        fillSections();
        props.setReloadTable(false);
      }
    }, [props.reloadTable])
  
    async function fillSections() {
      var resp = await apiStudent.list();
      setStudents(resp);
    }
  
    async function deleteStudent(id) {
      var resp = await apiStudent.deleteStudent(id);
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
      props.setName("");
      props.setIdEdit(undefined);
    }
  
    return (
      <Card body>
        <h5>Alumnos</h5>
        <hr />
        <Table size='sm' hover bordered className='bg-forms' responsive>
          <thead>
            <tr>
            <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Tipo de Documento</th>
              <th>Numero de Documento</th>
              <th>Edad</th>
              <th>Genero</th>
              <th>Grado Académico</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((st, idx) => {
                return (
                  <tr key={idx} className="pointer">
                    <td>{st.name}</td>
                    <td>{st.lastName}</td>
                    <td>{st.mothersLastName}</td>
                    <td>{st.documentType}</td>
                    <td>{st.documentNumber}</td>
                    <td>{st.age}</td>
                    <td>{st.gender}</td>
                    <td>{st.currentAcademicLevel.level}</td>
                    <td style={{ textAlign: 'center' }}><Button size='sm'>Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Card>
    )
}

StudentList.propTypes = {}

export default StudentList