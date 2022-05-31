import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as apiAcademicLevel from '../api/apiAcademicLevel'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectAcademicLevels = props => {

    const [academicLevels, setAcademicLevels] = useState([]);

    useEffect(() => {
        fillShifts();
    }, [])

    async function fillShifts() {
        await apiAcademicLevel.list().then((response) => {
            var rows = [];
            response.forEach(al => {
                rows.push(
                    <option key={al.id} value={al.id}>{al.level}</option>
                )
            })
            setAcademicLevels(rows);
        })
    }

    function setShift(event) {
        props.setAcademicLevel(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Grados Académicos:</Label>
            <Input type='select' size='sm' value={props.academicLevel} onChange = { setShift } >
                <option value='-1'>[Seleccione]</option>
                {academicLevels}
            </Input>
        </FormGroup>
    )
}

SelectAcademicLevels.propTypes = {}

export default SelectAcademicLevels