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
    const [idEdit, setIdEdit] = useState(-1);
    const [name, setName] = useState("");

    useEffect(() => {
        if (props.subject != null) {
            setName(props.subject.name);
            setIdEdit(props.subject.id);
        }else{
            setName("");
            setIdEdit(undefined);
        }
    }, [props.subject])


    async function save() {
        var subject = {};
        if (idEdit != undefined) {
            subject.id = idEdit;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre de la materia.",
            });
            return;
        } else {
            subject.name = name;
        }

        var resp = await apiSubject.save(subject);
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