import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiEvaluation from '../../api/apiEvaluation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SelectEvaluationType from '../../components/comboBoxes/selectEvaluationType'
import SelectSubject from '../../components/comboBoxes/selectSubject'
import SelectAcademicPeriod from '../../components/comboBoxes/selectAcademicPeriod'
import SelectClassroom from '../../components/comboBoxes/selectClassrooms'

const SaveEvaluation = (props) => {

    const MySwal = withReactContent(Swal);
    const [name, setName] = useState("");
    const [evaluationType, setEvaluationType] = useState(null);
    const [subject, setSubject] = useState(null);
    const [academicPeriod, setAcademicPeriod] = useState(null)
    const [classroom, setClassroom] = useState(null)
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [score, setScore] = useState("");
    

    useEffect(() => {
        if (props.evaluation != null) {
            setName(props.subject.name);
        }else{
            setName("");
        }
    }, [props.evaluation])

    async function save() {
        var evaluation = {};
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre de la evaluación",
            });
            return;
        } else {
            evaluation.evaluationName = name;
        }

        if (evaluationType == null) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar el tipo de evaluación",
            });
            return;
        } else {
            evaluation.evaluationTypeId = evaluationType;
        }

        if (subject == null) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un curso",
            });
            return;
        } else {
            evaluation.subjectId = subject;
        }

        if (academicPeriod == null) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un período académico",
            });
            return;
        } else {
            evaluation.academicPeriodId = academicPeriod;
        }

        if (classroom == null) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un salón de clases",
            });
            return;
        } else {
            evaluation.classRoomId = classroom;
        }

        if (weight.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo peso",
            });
            return;
        } else {
            evaluation.weight = weight;
        }

        if (date.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar una fecha de evaluación",
            });
            return;
        } else {
            evaluation.evaluationDate = date;
        }

        if (score.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe indicar un puntaje máximo",
            });
            return;
        } else {
            evaluation.maximumScore = score;
        }

        var resp = await apiEvaluation.save(evaluation);
        if (resp.response != undefined) {
            if (resp.response.status != 200) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resp.response.data.detail,
                });
                return;
            }
        }
        MySwal.fire({
            icon: 'success',
            title: 'Ok',
            text: "Se guardo Correctamente"
        });
        props.setReloadTable(true);
        clean();
    }

    function clean() {
        setName("");
    }

    return (
        <Card body>
            <h5>Nueva Evaluación</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre: </Label>
                        <Input size='sm' placeholder='Ingrese nombre de la evaluación' value={name} onChange={e => setName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <SelectEvaluationType evaluationType = { evaluationType } setEvaluationType = { setEvaluationType } />
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <SelectSubject subject = { subject } setSubject = { setSubject } />
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <SelectAcademicPeriod academicPeriod = { academicPeriod } setAcademicPeriod = { setAcademicPeriod } />
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <SelectClassroom classroom = { classroom } setClassroom = { setClassroom } />
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Peso:</Label>
                        <Input size='sm' placeholder='Ingrese peso del curso' value={weight} onChange={e => setWeight(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Día de evaluación:</Label>
                        <Input size='sm' type='date' value={date} onChange={e => setDate(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Puntaje Máximo:</Label>
                        <Input size='sm' placeholder='Ingrese puntaje máximo' value={score} onChange={e => setScore(e.target.value)}></Input>
                    </FormGroup>
                    <Row>
                    <Col sm="5">
                        <Button style={{marginRight: 0}} size='sm' onClick={e => save()}>Grabar <FontAwesomeIcon icon={faFloppyDisk} /> </Button>
                    </Col>
                    <Col sm="5">
                        <Button style={{marginLeft: 0}} size='sm' onClick={e => clean()}>Nuevo <FontAwesomeIcon icon={faPlus} /> </Button>
                    </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

export default SaveEvaluation