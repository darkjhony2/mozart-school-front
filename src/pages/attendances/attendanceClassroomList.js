import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Col, Input, Label, Row, Table } from 'reactstrap';
import * as apiAttendance from '../../api/apiAttendance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/generals/search';
import SelectClassroom from '../../components/comboBoxes/selectClassrooms';
import SelectAttendanceStatus from '../../components/comboBoxes/selectAttendanceStatus';

const AttendanceClassroomList = props => {
    const [classroom, setClassroom] = useState(null);
    const [date, setDate] = useState("");
    const [attendance, setAttendance] = useState([]);
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (classroom != null && date != "")
            fillAttendanceClassroom();
    }, [classroom, date])

    async function fillAttendanceClassroom() {
        var resp = await apiAttendance.listByClassroom(classroom, date);
        setAttendance(resp);
    }

    return (
        <>
            <Card body>
                <h5>Asistencias por Salón</h5>
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
                        <Search columnSearch={0} target={'tableAttendance'} id={'searchAttendance'} placeholder={'Buscar por Nombre'} />
                    </Col>
                </Row>
                <br />
                <Table id={'tableAttendance'} size='sm' hover bordered className='bg-forms' responsive>
                    <thead>
                        <tr>
                            <th>Nombres y Apellidos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendance.map((at, idx) => {
                                return (
                                    <tr key={idx} className="pointer">
                                        <td>{at.student.name} {at.student.lastName} {at.student.mothersLastName}</td>
                                        <td>{at.attendanceStatus.name}</td>
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

AttendanceClassroomList.propTypes = {}

export default AttendanceClassroomList