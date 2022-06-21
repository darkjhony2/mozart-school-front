import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Row, Table } from 'reactstrap'
import Search from '../../components/generals/search'
import * as api_academicPeriods from '../../api/apiAcademicPeriod'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const AcademicPeriodList = props => {

    const [academicPeriods, setAcademicPeriods] = useState([]);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fillAcademicPeriods();
      }, [])
      
      useEffect(() => {
        if(props.reloadTable){
          fillAcademicPeriods();
          props.setReloadTable(false);
        }
      }, [props.reloadTable])
    
      async function fillAcademicPeriods() {
        var resp = await api_academicPeriods.list();
        setAcademicPeriods(resp);
      }

      async function deleteAcademicPeriod(id) {
        var resp = await api_academicPeriods.deleteAcademicPeriod(id);
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
      props.setAcademicPeriod(null);
      }
    

    return (
        <Card body>
            <h5>Períodos Académicos</h5>
            <hr />
            <Row>
                <Col sm="6">
                    <Search columnSearch={0} target={'table'} id={'search'} placeholder={'Buscar por Nombre'} />
                </Col>
            </Row>
            <br />
            <Table id='table' size='sm' hover bordered className='bg-forms' responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        academicPeriods.map((ap, idx) => {
                            return (
                                <tr key={idx} className="pointer" onClick={e => props.setAcademicPeriod(ap)}>
                                    <td>{ap.name}</td>
                                    <td>{ap.startDate}</td>
                                    <td>{ap.endDate}</td>
                                    <td style={{ textAlign: 'center' }}><Button size='sm' onClick={e => deleteAcademicPeriod(ap.id)}>Eliminar <FontAwesomeIcon icon={faTrash} /> </Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Card>
    )
}

AcademicPeriodList.propTypes = {}

export default AcademicPeriodList