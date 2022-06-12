import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import * as apiAcademicLevel from '../../api/apiAcademicLevel'
import { Button, Card, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const AcademicLevelList = props => {
  const [academicLevels, setAcademicLevels] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    fillAcademicLevels();
  }, [])

  useEffect(() => {
    if (props.reloadTable) {
      fillAcademicLevels();
      props.setReloadTable(false);
    }
  }, [props.reloadTable])

  async function fillAcademicLevels() {
    var resp = await apiAcademicLevel.list();
    setAcademicLevels(resp);
  }

  async function deleteAcademicLevel(id) {
    var resp = await apiAcademicLevel.deleteAcademicLevel(id);
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
    props.setAcademicLevel(null);
  }

  return (
    <Card body>
      <h5>Grados Academicos</h5>
      <hr />
      <Table size='sm' hover bordered className='bg-forms' responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Escala</th>
            <th>Grado anterior</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            academicLevels.map((al, idx) => {
              return (
                <tr key={idx} className="pointer" onClick={ e => props.setAcademicLevel(al)} >
                  <td>{al.level}</td>
                  <td>{al.scale}</td>
                  <td>{al.previousAcademicLevel}</td>
                  <td style={{ textAlign: 'center' }}><Button size='sm' onClick = { e => deleteAcademicLevel(al.id) } >Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Card>
  )
}

AcademicLevelList.propTypes = {}

export default AcademicLevelList