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
        props.setAttendanceStatus(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Input id={props.id} type='select' size='sm' value={props.attendanceStatus} onChange = { setAttStatus } >
                <option value={null}>[Seleccione]</option>
                {attendanceStatus}
            </Input>
        </FormGroup>
    )
}

export default SelectAttendanceStatus