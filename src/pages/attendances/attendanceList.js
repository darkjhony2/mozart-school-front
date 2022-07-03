import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Col, Input, Label, Row, Table } from 'reactstrap';
import * as apiClassroom from '../../api/apiClassroom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/generals/search';
import SelectClassroom from '../../components/comboBoxes/selectClassrooms';

const AttendanceList = props => {
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

    function showSchedule(id) {
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
                <h5>Control de asistencias</h5>
                <hr />
                <Row>
                    <Col sm='4'>
                        <SelectClassroom />
                    </Col>
                    <Col sm="4">
                        <Label size='sm'>Fecha:</Label>
                        <Input size={'sm'} type={'date'} />
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <Search columnSearch={0} target={'table'} id={'search'} placeholder={'Buscar por Nombre'} />
                    </Col>
                </Row>
                <br />
                <Table id={'table'} size='sm' hover bordered className='bg-forms' responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Turno</th>
                            <th>Tutor</th>
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
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

AttendanceList.propTypes = {}

export default AttendanceList