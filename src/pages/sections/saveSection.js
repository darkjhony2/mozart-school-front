import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import * as apiSection from '../../api/apiSection'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';

const SaveSection = props => {
    const [name, setName] = useState("");
    const [idEdit, setIdEdit] = useState(null);
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (props.classroom != null) {
            props.setIdEdit(props.classroom.id);
        }
    }, [props.classroom])


    async function save() {
        var section = {};
        if (idEdit != null) {
            section.id = idEdit;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe completar el campo nombre.",
            });
            return;
        } else {
            section.name = name;
        }

        var resp = await apiSection.save(section);
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
        clean();
    }

    function clean() {
        setName("");
    }

    return (
        <Card body>
            <h5>Nueva Seccion</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo curso' value={name} name="seccion" onChange={e => setName(e.target.value)}></Input>
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

SaveSection.propTypes = {}

export default SaveSection