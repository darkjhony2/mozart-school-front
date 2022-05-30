import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiSubject from '../../api/apiSubject'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SaveSubject = (props) => {

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (props.subject != null) {
            props.setName(props.subject.name);
            props.setIdEdit(props.subject.id);
        }
    }, [props.subject])


    async function save() {
        var subject = {};
        if (props.idEdit != null) {
            subject.id = props.idEdit;
        }
        if (props.name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre de la materia.",
            });
        } else {
            subject.name = props.name;
        }

        var resp = await apiSubject.save(subject);
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
        props.setName("");
    }

    function clean() {
        props.setName("");
        props.setIdEdit(undefined);
    }

    return (
        <Card body>
            <h5>Nueva Materia</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={props.name} onChange={e => props.setName(e.target.value)}></Input>
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

SaveSubject.propTypes = {}

export default SaveSubject