import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiStudent from '../../api/apiStudent'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SelectAcademicLevels from '../../components/comboBoxes/selectAcademicLevel'
import SelectDocumentType from '../../components/comboBoxes/selectDocumentType'
import SelectGender from '../../components/comboBoxes/selectGender'

const SaveStudent = (props) => {

    const MySwal = withReactContent(Swal)
    const [idEdit, setIdEdit] = useState(undefined);
    const [documentType, setDocumentType] = useState(-1);
    const [documentNumber, setDocumentNumber] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [motherLastName, setMotherLastName] = useState("");
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
            setGender(props.student.gender);
            setCurrentAcademicLevel(props.student.currentAcademicLevel);
        } else {  
            clean()   
        }
    }, [props.student])


    async function save() {
        var student = {};
        if (idEdit != undefined) {
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
            student.documentTypeId = documentType;
        }
        if (documentNumber.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe digitar un numero de documento.",
            });
            return;
        } else {
            student.documentNumber = documentNumber;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre del estudiante.",
            });
            return;
        } else {
            student.name = name;
        }

        if (lastName.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de apellido del estudiante.",
            });
            return;
        } else {
            student.lastName = lastName;
        }
        if (motherLastName.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de apellido materno del estudiante.",
            });
            return;
        } else {
            student.mothersLastName =  motherLastName;
        }            
        if (gender.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar el genero del estudiante.",
            });
            return;
        } else {
            student.genderId = gender;
        }   
        if (currentAcademicLevel<1) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un grado académico.",
            });
            return;
        } else {
            student.currentAcademicLevelId = currentAcademicLevel;
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
        setIdEdit(undefined);
        setDocumentType(-1);
        setDocumentNumber("");
        setName("");
        setLastName("");
        setMotherLastName("");
        setGender("");
        setCurrentAcademicLevel(-1);
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
                        <Label size='sm'>Apellido Paterno</Label>
                        <Input size='sm' placeholder='Ingrese apellido paterno del estudiante' value={lastName} onChange={e => setLastName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Apellido Materno</Label>
                        <Input size='sm' placeholder='Ingrese apellido materno del estudiante' value={motherLastName} onChange={e => setMotherLastName(e.target.value)}></Input>
                    </FormGroup>          
                    <FormGroup className='mb-1'>
                       <SelectDocumentType documentType={ documentType } setDocumentType= { setDocumentType }/>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Numero de Documento</Label>
                        <Input size='sm' placeholder='Ingrese numero de documento' value={documentNumber} onChange={e => setDocumentNumber(e.target.value)}></Input>
                    </FormGroup>    
                    <FormGroup className='mb-1'>
                       <SelectGender gender={ gender } setGender= { setGender }/>
                    </FormGroup>     
                    <FormGroup className='mb-1'>
                       <SelectAcademicLevels academicLevel={ currentAcademicLevel } setAcademicLevel= { setCurrentAcademicLevel } previousLevelLabel="Grado actual"/>
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