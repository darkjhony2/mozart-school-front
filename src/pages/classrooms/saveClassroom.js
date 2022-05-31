import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import * as apiClassroom from '../../api/apiClassroom'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import SelectShifts from '../../components/selectShifts'
import SelectAcademicLevels from '../../components/selectAcademicLevel'
import SelectTeachers from '../../components/selectTeachers'
import SelectSections from '../../components/selectSections'

const SaveClassroom = props => {

    const [shift, setShift] = useState("-1");
    const [academicLevel, setAcademicLevel] = useState("-1");
    const [teacher, setTeacher] = useState("-1");
    const [section, setSection] = useState("-1");
    const [idEdit, setIdEdit] = useState(null);
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (props.classroom != null) {
            props.setIdEdit(props.classroom.id);
        }
    }, [props.classroom])


    async function save() {
        var classroom = {};
        if (idEdit != null) {
            classroom.id = props.idEdit;
        }
        if (shift == "-1") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un turno.",
            });
            return;
        } else {
            classroom.shiftId = shift;
        }

        if (academicLevel == "-1") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un grado.",
            });
            return;
        } else {
            classroom.academicLevelId = academicLevel;
        }

        if (teacher == "-1") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un tutor.",
            });
            return;
        } else {
            classroom.tutorId = teacher;
        }

        if (section == "-1") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "Debe seleccionar un tutor.",
            });
            return;
        } else {
            classroom.sectionId = section;
        }

        var resp = await apiClassroom.save(classroom);
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
        setShift("-1");
        setAcademicLevel("-1");
        setTeacher("-1");
        setSection("-1");
        setIdEdit(null);
    }

    return (
        <Card body>
            <h5>Nuevo Salon de Clases</h5>
            <hr />
            <Row>
                <Col sm="8">
                    <Row>
                        <Col sm='4'>
                            <SelectAcademicLevels academicLevel={academicLevel} setAcademicLevel={setAcademicLevel} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='4'>
                            <SelectShifts shift={shift} setShift={setShift} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='4'>
                            <FormGroup className='mb-2'>
                                <Label size='sm'>Tutores:</Label>
                                <SelectTeachers teacher={teacher} setTeacher={setTeacher} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='4'>
                            <SelectSections section={section} setSection={setSection} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            <Button style={{ marginRight: 0 }} size='sm' onClick={e => save()}>Grabar <FontAwesomeIcon icon={faFloppyDisk} /> </Button>
                        </Col>
                        <Col sm="2">
                            <Button style={{ marginLeft: 0 }} size='sm' onClick={e => clean()}>Nuevo <FontAwesomeIcon icon={faPlus} /> </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

SaveClassroom.propTypes = {}

export default SaveClassroom