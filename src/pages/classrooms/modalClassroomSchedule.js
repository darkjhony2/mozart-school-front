import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, Table } from 'reactstrap'
import * as apiSchedule from '../../api/apiClassroomSchedule'

const ModalClassroomSchedule = props => {

    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        if (props.isOpen) {
            fillSchedule();
        }
    }, [props.isOpen])

    async function fillSchedule() {
        var resp = await apiSchedule.list(props.idClassroom);
        setSchedule(resp);
    }

    return (
        <Modal isOpen={props.isOpen} toggle={e => props.setIsOpen(!props.isOpen)} size="lg">
            <ModalBody>
                <h5>Horario de la Clase</h5>
                <hr />
                <Table size='sm' hover bordered className='bg-forms'>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Día</th>
                            <th>Curso</th>
                            <th>Docente</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        schedule.map((s,idx) => {
                            return(
                            <tr key={idx}>
                                <td>{s.startTime + " - " + s.endTime}</td>
                                <td>{s.dayOfWeek}</td>
                                <td>{s.subject.name}</td>
                                <td>{s.teacher.name + " " + s.teacher.lastName + " " + s.teacher.mothersLastName}</td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </ModalBody>
        </Modal>
    )
}

ModalClassroomSchedule.propTypes = {}

export default ModalClassroomSchedule