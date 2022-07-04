import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as apiAcademicLevel from '../../api/apiAcademicLevel'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SelectAcademicLevels from '../../components/comboBoxes/selectAcademicLevel'
import SelectAcademicScales from '../../components/comboBoxes/selectAcademicScale'

const SaveAcademicLevel = (props) => {

    const MySwal = withReactContent(Swal)
    const [idEdit, setIdEdit] = useState(-1);
    const [name, setName] = useState("");
    const [scale, setScale] = useState(-1);
    const [previousLevel, setPreviousLevel] = useState(-1);
    const [reloadList, setReloadList] = useState(false)

    useEffect(() => {
        if (props.academicLevel != null) {
            setName(props.academicLevel.level);
            setIdEdit(props.academicLevel.id);
            setScale(""+props.academicLevel.scaleId);
            setPreviousLevel(props.academicLevel.previousAcademicLevelId);
        } else {
            setName("");
            setIdEdit(-1);
            setScale(-1);
            setPreviousLevel(-1);
        }
    }, [props.academicLevel])

    useEffect(() => {
        if(props.reloadTable){
            setReloadList(true);
        }
    }, [props.reloadTable])
    


    async function save() {
        var academicLevel = {};
        if (idEdit > 0) {
            academicLevel.id = idEdit;
        }
        if (name.trim() == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe llenar el campo de nombre de la materia.",
            });
            return;
        } else {
            academicLevel.level = name;
        }

        if (scale < 1) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar una escala.",
            });
            return;
        } else {
            academicLevel.academicScaleId = scale;
        }

        if (previousLevel < 1) {
            academicLevel.previousAcademicLevelId = null;
        } else {
            academicLevel.previousAcademicLevelId = previousLevel;
        }
        

        var resp = await apiAcademicLevel.save(academicLevel);
        console.log(resp);
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
        setScale(-1);
        setPreviousLevel(-1);
    }

    return (
        <Card body>
            <h5>Nuevo Grado Academico</h5>
            <hr />
            <Row>
                <Col sm="9">
                    <FormGroup className='mb-1'>
                        <Label size='sm'>Nombre</Label>
                        <Input size='sm' placeholder='Ingrese nombre del nuevo grado académico' value={name} onChange={e => setName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <SelectAcademicScales academicScale={scale} setAcademicScale={setScale} />
                    </FormGroup>
                    <FormGroup className='mb-1'>
                        <SelectAcademicLevels setReloadList = { setReloadList } previousLevelLabel='Grado anterior' academicLevel={previousLevel} 
                        setAcademicLevel={setPreviousLevel} reloadList = { reloadList } />
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

export default SaveAcademicLevel