import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Table } from 'reactstrap';
import * as apiClassroom from '../../api/apiClassroom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalClassroomSchedule from './modalClassroomSchedule';

const ClassroomList = props => {
    const [classrooms, setClassrooms] = useState([]);
    const [showModalSchedule, setShowModalSchedule] = useState(false);
    const [idClassroom, setIdClassroom] = useState("");
    //const MySwal = withReactContent(Swal)
  
    useEffect(() => {
      fillClassrooms();
    }, [])
  
    useEffect(() => {
      if (props.reloadTable) {
        fillClassrooms();
        props.setReloadTable(false);
      }
    }, [props.reloadTable])
  
    async function fillClassrooms() {
      var resp = await apiClassroom.list(2022);
      setClassrooms(resp);
    }

    function showSchedule(id){
      setShowModalSchedule(true);
      setIdClassroom(id);
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
      <>
      <Card body>
        <h5>Salones de Clase</h5>
        <hr />
        <Table size='sm' hover bordered className='bg-forms' responsive>
          <thead>
            <tr>
              <th>Grado</th>
              <th>Sección</th>
              <th>Turno</th>
              <th>Tutor</th>
              <th>Horario</th>
            </tr>
          </thead>
          <tbody>
            {
              classrooms.map((cl, idx) => {
                return (
                  <tr key={idx} className="pointer">
                    <td>{cl.level.level}</td>
                    <td>{cl.section.name}</td>
                    <td>{cl.shift.name}</td>
                    <td>{cl.tutor.name}</td>
                    <td style={{ textAlign: 'center' }}><Button size='sm' onClick={e =>  showSchedule(cl.id) } >Ver Horario <FontAwesomeIcon icon={faEye} /> </Button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Card>
      <ModalClassroomSchedule idClassroom = { idClassroom } isOpen = { showModalSchedule } setIsOpen= { setShowModalSchedule } />
      </>
    )
}

ClassroomList.propTypes = {}

export default ClassroomList