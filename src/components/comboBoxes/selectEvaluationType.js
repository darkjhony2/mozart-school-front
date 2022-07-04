import React, { useEffect, useState } from 'react'
import * as apiEvaluationType from '../../api/apiEvaluationType'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectEvaluationType = props => {

    const [evaluationTypes, setEvaluationTypes] = useState([]);

    useEffect(() => {
        fillEvaluationTypes();
    }, [])

    async function fillEvaluationTypes() {
        await apiEvaluationType.list().then((response) => {
            var rows = [];
            response.forEach(et => {
                rows.push(
                    <option key={et.id} value={et.id}>{et.name}</option>
                )
            })
            setEvaluationTypes(rows);
        })
    }

    function setEvaluationType(event) {
        props.setEvaluationType(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Tipo de evaluación:</Label>
            <Input type='select' size='sm' value={props.evaluationType} onChange = { setEvaluationType } >
                <option value={null}>[Seleccione]</option>
                {evaluationTypes}
            </Input>
        </FormGroup>
    )
}

SelectEvaluationType.propTypes = {}

export default SelectEvaluationType