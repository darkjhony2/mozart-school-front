import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as ApiShift from '../../api/apiShift'
import { Button, Card, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ShiftList = props => {
    const [shifts, setShifts] = useState([]);
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
      var resp = await ApiShift.list();
      setShifts(resp);
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
        <h5>Turnos</h5>
        <hr />
        <Table size='sm' hover bordered>
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
                  <tr key={idx} className="pointer">
                    <td>{shift.name}</td>
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

ShiftList.propTypes = {}

export default ShiftList