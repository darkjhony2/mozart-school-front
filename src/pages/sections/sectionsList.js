import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Col, Row, Table } from 'reactstrap';
import * as apiSection from '../../api/apiSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/generals/search';

const SectionsList = props => {
  const [sections, setSections] = useState([]);
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
    var resp = await apiSection.list();
    setSections(resp);
  }

  async function deleteSection(id) {
    var resp = await apiSection.deleteSection(id);
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
      <h5>Secciones</h5>
      <hr />
      <Row>
        <Col sm="8">
          <Search columnSearch={0} target={'table'} id={'search'} placeholder={'Buscar por Nombre'} />
        </Col>
      </Row>
      <br />
      <Table id={'table'} size='sm' hover bordered className='bg-forms' responsive>
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
                  <td style={{ textAlign: 'center' }}><Button size='sm' onClick={e => deleteSection(sec.id)}>Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
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