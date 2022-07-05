import React, { useEffect, useState } from 'react'
import * as apiEvaluation from '../../api/apiEvaluation'
import { FormGroup, Input, Label } from 'reactstrap';

const SelectEvaluation = props => {

    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('role') != 'Administrator')
            fillEvaluations();
    }, [])

    async function fillEvaluations() {
        await apiEvaluation.list().then((response) => {
            var rows = [];
            response.forEach(e => {
                rows.push(
                    <option key={e.id} value={e.id}>{e.evaluationName}</option>
                )
            })
            setEvaluations(rows);
        })
    }

    function setEvaluation(event) {
        props.setEvaluation(event.target.value);
    }

    return (
        <FormGroup className='mb-2'>
            <Label size='sm'>Evaluación:</Label>
            <Input type='select' size='sm' value={props.evaluationType} onChange = { setEvaluation } >
                <option value={null}>[Seleccione]</option>
                {evaluations}
            </Input>
        </FormGroup>
    )
}

SelectEvaluation.propTypes = {}

export default SelectEvaluation