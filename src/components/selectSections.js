import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as apiSection from '../api/apiSection'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectSections = props => {

    const [sections, setSections] = useState([]);

    useEffect(() => {
        fillSections();
    }, [])

    async function fillSections() {
        await apiSection.list().then((response) => {
            var rows = [];
            response.forEach(sec => {
                rows.push(
                    <option key={sec.id} value={sec.id}>{sec.name}</option>
                )
            })
            setSections(rows);
        })
    }

    function setSection(event) {
        props.setSection(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Secciones:</Label>
            <Input type='select' size='sm' value={props.section} onChange = { setSection } >
                <option value='-1'>[Seleccione]</option>
                {sections}
            </Input>
        </FormGroup>
    )
}

SelectSections.propTypes = {}

export default SelectSections