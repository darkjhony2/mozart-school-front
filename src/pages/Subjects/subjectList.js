import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Table } from 'reactstrap'
import * as apiSubject from '../../api/apiSubject'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'


const SubjectList = (props) => {

  const [subjects, setSubjects] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    fillSubjects();
  }, [])
  
  useEffect(() => {
    if(props.reloadTable){
      fillSubjects();
      props.setReloadTable(false);
    }
  }, [props.reloadTable])

  async function fillSubjects() {
    var resp = await apiSubject.list();
    setSubjects(resp);
  }

  async function deleteSubject(id) {
    var resp = await apiSubject.deleteSubject(id);
    if(resp.response != undefined){
      if(resp.response.status != 200){
          MySwal.fire({
              icon: 'error',
              title: 'Error',
              text: resp.response.data.detail,
          });
          return;
      }
  }
  MySwal.fire({
      icon:'success',
      title: 'Ok',
      text: "Se guardo Correctamente"
  });
  props.setReloadTable(true);
  props.setName("");
  props.setIdEdit(undefined);
  }

  return (
    <Card body>
        <h5>Materias</h5>
        <hr/>
        <Table size='sm' hover bordered className='bg-forms'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                  subjects.map((sub, idx) => {
                    return(
                      <tr key = { idx } className="pointer" onClick={ e => props.setSubject(sub) }>
                        <td>{sub.name}</td>
                        <td style={{textAlign: 'center'}}><Button size='sm' onClick={e => deleteSubject(sub.id)}>Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
                      </tr>
                    )
                  })
                }
            </tbody>
        </Table>
    </Card>
  )
}

SubjectList.propTypes = {}

export default SubjectList