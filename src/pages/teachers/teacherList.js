import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as apiTeacher from '../../api/apiTeacher';
import { Button, Card, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TeacherList = props => {
    const [teachers, setTeachers] = useState([]);
    //const MySwal = withReactContent(Swal)
  
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
      var resp = await apiTeacher.list();
      setTeachers(resp);
    }
  
    // async function deleteSubject(id) {
    //   var resp = await apiSubject.deleteSubject(id);
    //   if (resp.response != undefined) {
    //     if (resp.response.status != 200) {
    //       MySwal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: resp.response.data.detail,
    //       });
    //       return;
    //     }
    //   }
    //   MySwal.fire({
    //     icon: 'success',
    //     title: 'Ok',
    //     text: "Se guardo Correctamente"
    //   });
    //   props.setReloadTable(true);
    //   props.setName("");
    //   props.setIdEdit(undefined);
    // }
  
    return (
      <Card body>
        <h5>Docentes</h5>
        <hr />
        <Table size='sm' hover bordered className='bg-forms' responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Tipo de Documento</th>
              <th>Numero de Documento</th>
              <th>Teléfono</th>
              <th>Edad</th>
              <th>Genero</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              teachers.map((teacher, idx) => {
                return (
                  <tr key={idx} className="pointer">
                    <td>{teacher.name}</td>
                    <td>{teacher.lastName}</td>
                    <td>{teacher.mothersLastName}</td>
                    <td>{teacher.documentType}</td>
                    <td>{teacher.documentNumber}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.age}</td>
                    <td>{teacher.gender}</td>
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

TeacherList.propTypes = {}

export default TeacherList