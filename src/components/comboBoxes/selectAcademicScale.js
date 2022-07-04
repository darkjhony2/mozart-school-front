import React, { useEffect, useState } from 'react'
import * as apiAcademicScale from '../../api/apiAcademicScale'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectAcademicScales = (props) => {
    const [academicScales, setAcademicScales] = useState([]);

    useEffect(() => {
        fillAcademicScales();
    }, [])

    async function fillAcademicScales() {
        await apiAcademicScale.list().then((response) => {
            var rows = [];
            response.forEach(ac => {
                rows.push(
                    <option key={ac.id} value={ac.id}>{ac.name}</option>
                )
            })
            setAcademicScales(rows);
            console.log(response);
        })
    }

    function setAcademicScale(event) {
        props.setAcademicScale(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Escala:</Label>
            <Input type='select' size='sm' value={props.academicScale} onChange = { setAcademicScale } >
                <option value='-1'>[Seleccione]</option>
                {academicScales}
            </Input>
        </FormGroup>
    )
}

SelectAcademicScales.propTypes = {}

export default SelectAcademicScales