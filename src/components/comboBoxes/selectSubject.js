import React, { useEffect, useState } from 'react'
import * as apiSubjects from '../../api/apiSubject'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectSubject = props => {

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fillSubjects();
    }, [])

    async function fillSubjects() {
        await apiSubjects.list().then((response) => {
            var rows = [];
            response.forEach(s => {
                rows.push(
                    <option key={s.id} value={s.id}>{s.name}</option>
                )
            })
            setSubjects(rows);
        })
    }

    function setSubject(event) {
        props.setSubject(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Materia:</Label>
            <Input type='select' size='sm' value={props.subject} onChange = { setSubject } >
                <option value={null}>[Seleccione]</option>
                {subjects}
            </Input>
        </FormGroup>
    )
}

export default SelectSubject