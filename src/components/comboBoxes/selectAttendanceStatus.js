import React, { useEffect, useState } from 'react'
import * as apiAttendanceStatus from '../../api/apiAttendanceStatus'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectAttendanceStatus = (props) => {
    const [attendanceStatus, setAttendanceStatus] = useState([]);

    useEffect(() => {
        fillAttendanceStatus();
    }, [])

    async function fillAttendanceStatus() {
        await apiAttendanceStatus.list().then((response) => {
            var rows = [];
            response.forEach(as => {
                rows.push(
                    <option key={as.id} value={as.id}>{as.name}</option>
                )
            })
            setAttendanceStatus(rows);
        })
    }

    function setAttStatus(event) {
        let attendance = {};
        let isFound = false;
        attendance.studentId = props.id;
        attendance.attendanceStatusId = event.target.value;
        if (props.attendanceStatus.length > 0) {
            props.attendanceStatus.forEach(attStat => {
                if (attStat.studentId == attendance.studentId) {
                    isFound = true;
                }
            })
            if (!isFound) {
                props.setAttendanceStatus([...props.attendanceStatus, attendance]);
            }else{
                props.attendanceStatus.forEach(attStat => {
                    if (attStat.studentId == attendance.studentId) {
                        attStat.attendanceStatusId = attendance.attendanceStatusId;
                    }
                })
            }
        } else {
            props.setAttendanceStatus([...props.attendanceStatus, attendance]);
        }
    }

    return (
        <FormGroup className='mb-2'>
            <Input id={props.id} type='select' size='sm' onChange={setAttStatus} >
                <option value={null}>[Seleccione]</option>
                {attendanceStatus}
            </Input>
        </FormGroup>
    )
}

export default SelectAttendanceStatus