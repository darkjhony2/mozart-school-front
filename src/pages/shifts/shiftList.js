import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as ApiShift from '../../api/apiShift'
import { Button, Card, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const ShiftList = props => {
  const [shifts, setShifts] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    fillShifts();
  }, [])

  useEffect(() => {
    if (props.reloadTable) {
      fillShifts();
      props.setReloadTable(false);
    }
  }, [props.reloadTable])

  async function fillShifts() {
    var resp = await ApiShift.list();
    setShifts(resp);
  }

  async function deleteShift(id) {
    var resp = await ApiShift.deleteShift(id);
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
    props.setIdEdit(-1);
  }

  return (
    <Card body>
      <h5>Turnos</h5>
      <hr />
      <Table size='sm' hover bordered className='bg-forms' responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            shifts.map((shift, idx) => {
              return (
                <tr key={idx} className="pointer" onClick={e=>props.setShift(shift)}>
                  <td>{shift.name}</td>
                  <td style={{ textAlign: 'center' }}><Button size='sm' onClick={e=>deleteShift(shift.id)}>Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Card>
  )
}

ShiftList.propTypes = {}

export default ShiftList