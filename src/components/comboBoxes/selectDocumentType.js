import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as apiDocumentType from '../../api/apiDocumentType'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectDocumentType = props => {

    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        fillDocumentTypes();
    }, [])

    async function fillDocumentTypes() {
        await apiDocumentType.list().then((response) => {
            var rows = [];
            response.forEach(dt => {
                rows.push(
                    <option key={dt.id} value={dt.id}>{dt.description}</option>
                )
            })
            setDocumentTypes(rows);
        })
    }

    function setDocumentType(event) {
        props.setDocumentType(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Tipo de Documento:</Label>
            <Input type='select' size='sm' value={props.documentType} onChange={setDocumentType} >
                <option value='-1'>[Seleccione]</option>
                {documentTypes}
            </Input>
        </FormGroup>
    )
}

SelectDocumentType.propTypes = {

}

export default SelectDocumentType