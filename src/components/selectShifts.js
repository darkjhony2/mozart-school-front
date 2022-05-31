import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as ApiShift from '../api/apiShift'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectShifts = props => {

    const [shifts, setShifts] = useState([]);

    useEffect(() => {
        fillShifts();
    }, [])

    async function fillShifts() {
        await ApiShift.list().then((response) => {
            var rows = [];
            response.forEach(s => {
                rows.push(
                    <option key={s.id} value={s.id}>{s.name}</option>
                )
            })
            setShifts(rows);
        })
    }

    function setShift(event) {
        props.setShift(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Turnos:</Label>
            <Input type='select' size='sm' value={props.shift} onChange = { setShift } >
                <option value='-1'>[Seleccione]</option>
                {shifts}
            </Input>
        </FormGroup>
    )
}

SelectShifts.propTypes = {}

export default SelectShifts