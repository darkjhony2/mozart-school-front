import React, { useEffect, useState } from 'react'
import * as apiClassroom from '../../api/apiClassroom'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectClassroom = props => {

    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        fillClassrooms();
    }, [])

    async function fillClassrooms() {
        await apiClassroom.list(2022).then((response) => {
            var rows = [];
            response.forEach(c => {
                rows.push(
                    <option key={c.id} value={c.id}>{c.level.level + " " + c.section.name + " " + c.shift.name}</option>
                )
            })
            setClassrooms(rows);
        })
    }

    function setClassroom(event) {
        props.setClassroom(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Salón de Clase:</Label>
            <Input type='select' size='sm' value={props.classroom} onChange = { setClassroom } >
                <option value={null}>[Seleccione]</option>
                {classrooms}
            </Input>
        </FormGroup>
    )
}

SelectClassroom.propTypes = {}

export default SelectClassroom