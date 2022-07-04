import React, { useEffect, useState } from 'react'
import * as apiAcademicPeriods from '../../api/apiAcademicPeriod'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectAcademicPeriod = props => {

    const [academicPeriods, setAcademicPeriods] = useState([]);

    useEffect(() => {
        fillAcademicPeriods();
    }, [])

    async function fillAcademicPeriods() {
        await apiAcademicPeriods.list().then((response) => {
            var rows = [];
            response.forEach(ap => {
                rows.push(
                    <option key={ap.id} value={ap.id}>{ap.name}</option>
                )
            })
            setAcademicPeriods(rows);
        })
    }

    function setAcademicPeriod(event) {
        props.setAcademicPeriod(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Período académico:</Label>
            <Input type='select' size='sm' value={props.academicPeriod} onChange = { setAcademicPeriod } >
                <option value={null}>[Seleccione]</option>
                {academicPeriods}
            </Input>
        </FormGroup>
    )
}

export default SelectAcademicPeriod