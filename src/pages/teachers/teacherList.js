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
        <Table size='sm' hover bordered>
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
              teachers.map((shift, idx) => {
                return (
                  <tr key={idx} className="pointer">
                    <td>{shift.name}</td>
                    <td>{shift.lastName}</td>
                    <td>{shift.mothersLastName}</td>
                    <td>{shift.documentType}</td>
                    <td>{shift.documentNumber}</td>
                    <td>{shift.phone}</td>
                    <td>{shift.age}</td>
                    <td>{shift.gender}</td>
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