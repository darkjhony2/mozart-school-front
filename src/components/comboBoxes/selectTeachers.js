import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as apiTeachers from '../../api/apiTeacher'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectTeachers = props => {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fillShifts();
    }, [])

    async function fillShifts() {
        await apiTeachers.list().then((response) => {
            var rows = [];
            response.forEach(t => {
                rows.push(
                    <option key={t.id} value={t.id}>{t.name + " " + t.lastName + " " + t.mothersLastName} </option>
                )
            })
            setTeachers(rows);
        })
    }

    function setTeacher(event) {
        props.setTeacher(event.target.value);
    }

    return (
        <Input type='select' size='sm' value={props.teacher} onChange={setTeacher} >
            <option value='-1'>[Seleccione]</option>
            {teachers}
        </Input>
    )
}

SelectTeachers.propTypes = {}

export default SelectTeachers