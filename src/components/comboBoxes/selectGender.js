import React, { useEffect, useState } from 'react'
import * as apiGender from '../../api/apiGender'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectGender = props => {

    const [genders, setGenders] = useState([]);

    useEffect(() => {
        fillGenders();
    }, [])

    async function fillGenders() {
        await apiGender.list().then((response) => {
            var rows = [];
            response.forEach(g => {
                rows.push(
                    <option key={g.id} value={g.id}>{g.name}</option>
                )
            })
            setGenders(rows);
        })
    }

    function setGender(event) {
        props.setGender(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Género:</Label>
            <Input type='select' size='sm' value={props.gender} onChange={setGender} >
                <option value='-1'>[Seleccione]</option>
                {genders}
            </Input>
        </FormGroup>
    )
}

export default SelectGender