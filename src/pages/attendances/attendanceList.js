import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Col, Input, Label, Row, Table } from 'reactstrap';
import * as apiStudentClassroom from '../../api/studentClassroom'
import * as apiAttendance from '../../api/apiAttendance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/generals/search';
import SelectClassroom from '../../components/comboBoxes/selectClassrooms';
import SelectAttendanceStatus from '../../components/comboBoxes/selectAttendanceStatus';

const AttendanceList = props => {
    const [classroom, setClassroom] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState([]);
    const [date, setDate] = useState("")
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (classroom != null)
            fillStudentClassroom();
    }, [classroom])

    useEffect(() => {
        if (props.reloadTable) {
            fillStudentClassroom();
            props.setReloadTable(false);
        }
    }, [props.reloadTable])

    async function fillStudentClassroom() {
        var resp = await apiStudentClassroom.listByClassroom(classroom);
        setStudents(resp.students);
    }

    async function saveAttendance() {
        var resp = await apiAttendance.save(attendanceStatus, classroom, date);
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
    }

    return (
        <>
            <Card body>
                <h5>Control de asistencias</h5>
                <hr />
                <Row>
                    <Col sm='4'>
                        <SelectClassroom setClassroom={setClassroom} classroom={classroom} />
                    </Col>
                    <Col sm="4">
                        <Label size='sm'>Fecha:</Label>
                        <Input size={'sm'} type={'date'} value ={ date } onChange= { e => setDate(e.target.value)} />
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
                            <th>Nombres y Apellidos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((st, idx) => {
                                return (
                                    <tr key={idx} className="pointer">
                                        <td>{st.name} {st.lastName} {st.mothersLastName}</td>
                                        <td><SelectAttendanceStatus id={st.id} attendanceStatus = { attendanceStatus } setAttendanceStatus = { setAttendanceStatus } /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Row>
                    <Col sm="">
                        <Button size='sm' onClick={e => saveAttendance()} >Grabar</Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

AttendanceList.propTypes = {}

export default AttendanceList