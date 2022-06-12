import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiTeacher from '../../api/apiTeacher'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SaveTeacher = (props) => {

    const MySwal = withReactContent(Swal)
    const [idEdit, setIdEdit] = useState(undefined);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mothersLastName, setMothersLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [documentType, setDocumentType] = useState(-1);
    const [documentNumber, setDocumentNumber] = useState("");
    const [gender, setGender] = useState(-1);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (props.teacher != null) {
            setIdEdit(props.teacher.id);
            setName(props.teacher.name);
            setLastName(props.teacher.lastName);
            setMothersLastName(props.teacher.mothersLastName);
            setDateOfBirth(props.teacher.dateOfBirth);
            setDocumentType(props.teacher.documentType);
            setDocumentNumber(props.teacher.documentNumber);
            setGender(props.teacher.gender);
            setEmail(props.teacher.email);
            setPhone(props.teacher.phone);
        } else {
            clean()
        }
    }, [props.teacher])


    async function save() {
        var teacher = {};
        if (idEdit != undefined) {
            teacher.id = idEdit;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo nombre.",
            });
            return;
        } else {
            teacher.name = name;
        }

        if (lastName.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo apellido paterno.",
            });
            return;
        } else {
            teacher.lastName = lastName;
        }

        if (mothersLastName.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo apellido materno.",
            });
            return;
        } else {
            teacher.mothersLastName = mothersLastName;
        }

        if (dateOfBirth.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo fecha de nacimiento",
            });
            return;
        } else {
            teacher.dateOfBirth = dateOfBirth;
        }
        
        if (documentType < 1) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo tipo de documento",
            });
            return;
        } else {
            teacher.documentType = documentType;
        }

        if (documentNumber.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo número de documento",
            });
            return;
        } else {
            teacher.documentNumber = documentNumber;
        }

        if (gender < 1) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo genero",
            });
            return;
        } else {
            teacher.gender = gender;
        }

        if (email.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo correo",
            });
            return;
        } else {
            teacher.email = email;
        }

        if (phone.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo telefono",
            });
            return;
        } else {
            teacher.phone = phone;
        }

        var resp = await apiTeacher.save(teacher);
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
        setIdEdit(undefined);
        setLastName("");
        setMothersLastName("");
        setDateOfBirth("");
        setDocumentType(-1);
        setDocumentNumber("");
        setGender(-1);
        setEmail("");
        setPhone("");
    }

    return (
        <Card body>
            <h5>Nueva Materia</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={name} onChange={e => setName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Apellido Paterno</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={lastName} onChange={e => setLastName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Apellido Materno</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={mothersLastName} onChange={e => setMothersLastName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Fecha de nacimiento</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Número de documento</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={documentNumber} onChange={e => setDocumentNumber(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Correo</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={email} onChange={e => setEmail(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Teléfono</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={phone} onChange={e => setPhone(e.target.value)}></Input>
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

export default SaveTeacher