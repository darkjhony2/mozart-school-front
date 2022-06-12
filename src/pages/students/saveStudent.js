import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiStudent from '../../api/apiStudent'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SelectAcademicLevels from '../../components/comboBoxes/selectAcademicLevel'
import SelectAcademicScales from '../../components/comboBoxes/selectAcademicScale'
import SelectDocumentType from '../../components/comboBoxes/selectDocumentType'

const SaveStudent = (props) => {

    const MySwal = withReactContent(Swal)
    const [idEdit, setIdEdit] = useState(-1);
    const [documentType, setDocumentType] = useState(-1);
    const [documentNumber, setDocumentNumber] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [motherlastName, setMotherLastName] = useState("");
    const [age, setAge] = useState(-1);
    const [gender, setGender] = useState("");
    const [currentAcademicLevel, setCurrentAcademicLevel] = useState(-1);

    useEffect(() => {
        if (props.student != null) {    
            setIdEdit(props.student.id);
            setDocumentType(props.student.documentType);
            setDocumentNumber(props.student.documentNumber);
            setName(props.student.name);
            setLastName(props.student.lastName);
            setMotherLastName(props.student.motherlastName);
            setAge(props.student.age);
            setGender(props.student.gender);
            setCurrentAcademicLevel(props.student.currentAcademicLevel);
        } else {  
            setIdEdit(undefined);
            setDocumentType(-1);
            setDocumentNumber("");
            setName("");
            setLastName("");
            setMotherLastName("");
            setAge(-1);
            setGender("");
            setCurrentAcademicLevel(-1);
        }
    }, [props.student])


    async function save() {
        var student = {};
        if (idEdit > 0) {
            student.id = idEdit;
        }
        if (documentType<1) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un tipo de documento.",
            });
            return;
        } else {
            student.documentType = documentType;
        }
        if (documentNumber.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe digitar un numero de documento.",
            });
            return;
        } else {
            student.setDocumentNumber = documentNumber;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre del estudiante.",
            });
            return;
        } else {
            student.setDocumentNumber = documentNumber;
        }

        if (lastName.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de apellido del estudiante.",
            });
            return;
        } else {
            student.name = name;
        }

        var resp = await apiStudent.save(student);
        props.setReloadTable(true);
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
        setIdEdit(-1);
    }

    return (
        <Card body>
            <h5>Nuevo Estudiante</h5>
            <hr />
            <Row>
                <Col sm="10">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del estudiante' value={name} onChange={e => setName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                       <SelectAcademicLevels academicLevel={ currentAcademicLevel } setAcademicLevel= { setCurrentAcademicLevel } previousLevelLabel="Grado actual"/>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                       <SelectDocumentType documentType={ documentType } setDocumentType= { setDocumentType }/>
                    </FormGroup>
                    <Row>
                        <Col sm="5">
                            <Button style={{ marginRight: 0 }} size='sm' onClick={e => save()}>Grabar <FontAwesomeIcon icon={faFloppyDisk} /> </Button>
                        </Col>
                        <Col sm="5">
                            <Button style={{ marginLeft: 0 }} size='sm' onClick={e => clean()}>Nuevo <FontAwesomeIcon icon={faPlus} /> </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

SaveStudent.propTypes = {}

export default SaveStudent