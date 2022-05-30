import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Table } from 'reactstrap';
import * as apiSection from '../../api/apiSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SectionsList = props => {
    const [sections, setSections] = useState([]);
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
      var resp = await apiSection.list();
      setSections(resp);
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
        <h5>Secciones</h5>
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
              sections.map((sec, idx) => {
                return (
                  <tr key={idx} className="pointer">
                    <td>{sec.name}</td>
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

SectionsList.propTypes = {}

export default SectionsList