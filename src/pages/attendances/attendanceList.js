import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Col, Input, Label, Row, Table } from 'reactstrap';
import * as apiStudentClassroom from '../../api/studentClassroom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/generals/search';
import SelectClassroom from '../../components/comboBoxes/selectClassrooms';
import SelectAttendanceStatus from '../../components/comboBoxes/selectAttendanceStatus';

const AttendanceList = props => {
    const [classroom, setClassroom] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    //const MySwal = withReactContent(Swal)

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
        console.log(resp.students)
        setStudents(resp.students);
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
                                        <td><SelectAttendanceStatus id={st.id} setAttendanceStatus={setAttendanceStatus} attendanceStatus={attendanceStatus} /></td>
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