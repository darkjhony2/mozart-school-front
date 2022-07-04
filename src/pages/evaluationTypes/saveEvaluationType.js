import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiEvaluationType from '../../api/apiEvaluationType'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SaveEvaluationType = (props) => {

    const MySwal = withReactContent(Swal);
    const [name, setName] = useState("");

    useEffect(() => {
        if (props.evaluationType != null) {
            setName(props.evaluationType.name);
        }else{
            setName("");
        }
    }, [props.evaluationType])

    async function save() {
        var evaluationType = {};
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre de la materia.",
            });
            return;
        } else {
            evaluationType.name = name;
        }

        var resp = await apiEvaluationType.save(evaluationType);
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
            <h5>Nuevo Tipo de Evaluación</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del tipo de evaluación' value={name} onChange={e => setName(e.target.value)}></Input>
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

export default SaveEvaluationType