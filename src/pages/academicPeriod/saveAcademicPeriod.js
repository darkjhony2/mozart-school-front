import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiAcademicPeriod from '../../api/apiAcademicPeriod'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SaveAcademicPeriod = (props) => {

    const MySwal = withReactContent(Swal)
    const [idEdit, setIdEdit] = useState(-1);
    const [name, setName] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    useEffect(() => {
        if (props.academicPeriod != null) {
            setName(props.academicPeriod.name);
            setIdEdit(props.academicPeriod.id);
            setFechaInicio(props.academicPeriod.startDate);
            setFechaFin(props.academicPeriod.endDate);
        }else{
            setName("");
            setIdEdit(undefined);
            setFechaInicio("");
            setFechaFin("");
        }
    }, [props.academicPeriod])


    async function save() {
        var academicPeriod = {};
        if (idEdit != undefined) {
            academicPeriod.id = idEdit;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre del Período Académico.",
            });
            return;
        } else {
            academicPeriod.name = name;
        }

        if (fechaInicio.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar una fecha de Inicio.",
            });
            return;
        } else {
            academicPeriod.startDate = fechaInicio;
        }

        if (fechaFin.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar una fecha de Fin.",
            });
            return;
        } else {
            academicPeriod.endDate = fechaFin;
        }


        var resp = await apiAcademicPeriod.save(academicPeriod);
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
        setFechaInicio("");
        setFechaFin("");
    }

    return (
        <Card body>
            <h5>Nuevo Periodo Académico</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={name} onChange={e => setName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Fecha Inicio:</Label>
                        <Input type='date' size='sm' value={fechaInicio} onChange={e => setFechaInicio(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Fecha Fin:</Label>
                        <Input type='date' size='sm'value={fechaFin} onChange={e => setFechaFin(e.target.value)}></Input>
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

SaveAcademicPeriod.propTypes = {}

export default SaveAcademicPeriod