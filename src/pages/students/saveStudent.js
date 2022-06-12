import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiShift from '../../api/apiShift'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SelectAcademicLevels from '../../components/comboBoxes/selectAcademicLevel'
import SelectAcademicScales from '../../components/comboBoxes/selectAcademicScale'

const SaveStudent = (props) => {

    const MySwal = withReactContent(Swal)
    const [idEdit, setIdEdit] = useState(-1);
    const [name, setName] = useState("");


    useEffect(() => {
        if (props.student != null) {
            setName(props.student.name);
            setIdEdit(props.student.id);
            setIdEdit(props.student.id);

        } else {
            setName("");
            setIdEdit(undefined);
        }
    }, [props.student])


    async function save() {
        var student = {};
        if (idEdit > 0) {
            student.id = idEdit;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre de la materia.",
            });
            return;
        } else {
            student.name = name;
        }

        var resp = await apiShift.save(student);
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
                        <Input size='sm' placeholder='Ingrese nombre del turno' value={name} onChange={e => setName(e.target.value)}></Input>
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